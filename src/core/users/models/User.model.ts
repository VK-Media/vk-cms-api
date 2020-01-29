import { hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import * as mongoose from 'mongoose'
import { isEmail } from 'validator'

import { IUserModel } from '../interfaces/User.interfaces'
import { userGroupRef } from '../utils/schema.utils'

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true
		},
		password: {
			type: String,
			required: true
		},
		userGroups: [{ type: mongoose.Types.ObjectId, ref: userGroupRef }]
	},
	{ timestamps: true }
)

UserSchema.path('email').validate((email: string) => {
	return isEmail(email)
}, 'Email is invalid')

UserSchema.methods.toJSON = function() {
	const userObject: IUserModel = this.toObject()
	delete userObject.password

	return userObject
}

UserSchema.methods.generateAuthToken = async function() {
	const user: IUserModel = this
	return sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
}

// Hash password before saving
UserSchema.pre('save', function(this: IUserModel, next) {
	const user: IUserModel = this
	const saltCycles = 8
	if (user.isModified('password')) {
		if (user.password.length < 8)
			throw Error('Password must be at least 8 characters')
		user.password = hashSync(user.password, saltCycles)
	}

	next()
})

// Email uniqueness for proper error
UserSchema.post(
	'save',
	(error: any, doc: IUserModel, next: mongoose.HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Email must be unique'))
		} else {
			next(error)
		}
	}
)

export default mongoose.model<IUserModel>('User', UserSchema)

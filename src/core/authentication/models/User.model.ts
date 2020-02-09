import { hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { HookNextFunction, model, Schema, Types } from 'mongoose'
import { isEmail } from 'validator'
import { ICollectionModel } from '../../collections/interfaces/Collection.interfaces'
import { IUserModel } from '../interfaces/User.interfaces'
import { userGroupName, userName } from '../utils/schema.utils'

export const UserSchema = new Schema(
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
		userGroups: [{ type: Types.ObjectId, ref: userGroupName }]
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

UserSchema.methods.isAdmin = function() {
	const userObject: IUserModel = this.toObject()

	for (const userGroup of userObject.userGroups) {
		if (userGroup.admin) return true
	}

	return false
}

UserSchema.methods.hasAccessToCollection = function(collection: ICollectionModel) {
	const userObject: IUserModel = this.toObject()

	for (const userGroup of userObject.userGroups) {
		if (collection.access.includes(userGroup._id)) return true
	}

	return false
}

UserSchema.methods.generateAuthToken = async function() {
	const user: IUserModel = this
	return sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
}

// Hash password before saving
UserSchema.pre('save', function(this: IUserModel, next: HookNextFunction) {
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
	(error: any, doc: IUserModel, next: HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Email must be unique'))
		} else {
			next(error)
		}
	}
)

export default model<IUserModel>(userName, UserSchema)

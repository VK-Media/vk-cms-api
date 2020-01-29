import * as mongoose from 'mongoose'

import { IUserGroupModel } from '../interfaces/UserGroup.interfaces'
import { userGroupRef } from '../utils/schema.utils'

const UserGroupSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true
		}
	},
	{ timestamps: true }
)

// Name uniqueness for proper error
UserGroupSchema.post(
	'save',
	(error: any, doc: IUserGroupModel, next: mongoose.HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Name must be unique'))
		} else {
			next(error)
		}
	}
)

export default mongoose.model<IUserGroupModel>(userGroupRef, UserGroupSchema)

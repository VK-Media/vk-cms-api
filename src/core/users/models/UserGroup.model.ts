import { HookNextFunction, model, Schema } from 'mongoose'

import { IUserGroupModel } from '../interfaces/UserGroup.interfaces'
import { userGroupName } from '../utils/schema.utils'

export const UserGroupSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true
		},
		admin: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

// Name uniqueness for proper error
UserGroupSchema.post(
	'save',
	(error: any, doc: IUserGroupModel, next: HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Name must be unique'))
		} else {
			next(error)
		}
	}
)

export default model<IUserGroupModel>(userGroupName, UserGroupSchema)

import { model, Schema, Types } from 'mongoose'
import { userGroupName } from '../../users/utils/schema.utils'

import { ICollectionAccessModel } from '../interfaces/CollectionAccess.interfaces'
import { collectionAccessName } from '../utils/schema.utils'

export const CollectionAccessSchema = new Schema({
	userGroup: {
		type: Types.ObjectId,
		ref: userGroupName,
		unique: true,
		required: true
	},
	read: {
		type: Boolean,
		default: true
	},
	manage: {
		type: Boolean,
		default: true
	},
	edit: {
		type: Boolean,
		default: false
	}
})

export default model<ICollectionAccessModel>(collectionAccessName, CollectionAccessSchema)
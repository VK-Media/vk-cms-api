import { model, Schema, Types } from 'mongoose'

import { userName } from '../../users/utils/schema.utils'
import { ICollectionItemModel } from '../interfaces/CollectionItem.interfaces'
import { collectionItemName, collectionName, fieldName } from '../utils/schema.utils'

export const CollectionItemSchema = new Schema(
	{
		collectionId: { type: Types.ObjectId, ref: collectionName, required: true },
		fields: [{ type: Types.ObjectId, ref: fieldName }],
		createdBy: { type: Types.ObjectId, ref: userName, required: true },
		updatedBy: { type: Types.ObjectId, ref: userName, required: true }
	},
	{ timestamps: true }
)

export default model<ICollectionItemModel>(collectionItemName, CollectionItemSchema)

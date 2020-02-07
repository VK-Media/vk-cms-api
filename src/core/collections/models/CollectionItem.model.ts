import { model, Schema, Types } from 'mongoose'

import { userName } from '../../authentication/utils/schema.utils'
import { ICollectionItemModel } from '../interfaces/CollectionItem.interfaces'
import { collectionItemName, collectionName, fieldName } from '../utils/schema.utils'

export const CollectionItemSchema = new Schema(
	{
		collectionId: { type: Types.ObjectId, ref: collectionName, required: true },
		fields: [{ type: Types.ObjectId, ref: fieldName }],
		createdBy: { type: Types.ObjectId, ref: userName },
		updatedBy: { type: Types.ObjectId, ref: userName }
	},
	{ timestamps: true }
)

export default model<ICollectionItemModel>(collectionItemName, CollectionItemSchema)

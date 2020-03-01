import { model, Schema, Types } from 'mongoose'
import { userName } from '../../authentication/utils/schema.utils'
import { FieldSchema } from '../../fields/models/Field.model'
import { ICollectionItemModel } from '../interfaces/CollectionItem.interfaces'
import { collectionItemName, collectionName } from '../utils/schema.utils'

export const CollectionItemSchema = new Schema(
    {
        collectionId: { type: Types.ObjectId, ref: collectionName, required: true },
        fields: [FieldSchema],
        createdBy: { type: Types.ObjectId, ref: userName },
        updatedBy: { type: Types.ObjectId, ref: userName }
    },
    { timestamps: true }
)

export default model<ICollectionItemModel>(collectionItemName, CollectionItemSchema)

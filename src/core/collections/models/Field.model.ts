import { model, Schema, Types } from 'mongoose'

import { IFieldModel } from '../interfaces/Field.interfaces'
import { collectionName, fieldName, fieldTypeName } from '../utils/schema.utils'

export const FieldSchema = new Schema(
	{
		collection: { type: Types.ObjectId, ref: collectionName, required: true },
		fieldType: { type: Types.ObjectId, ref: fieldTypeName, required: true },
		value: { type: String }
	},
	{ timestamps: true }
)

export default model<IFieldModel>(fieldName, FieldSchema)

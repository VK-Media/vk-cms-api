import { HookNextFunction, Schema } from 'mongoose'

import { FieldTypes, IFieldModel } from '../interfaces/Field.interfaces'

const FieldSchema = new Schema(
	{
		fieldType: {
			type: String,
			enum: Object.keys(FieldTypes),
			default: FieldTypes.TEXT,
			required: true
		},
		name: {
			type: String,
			required: true,
			lowercase: true,
			unique: true
		}
	},
	{ timestamps: true }
)

// Name uniqueness for proper error
FieldSchema.post(
	'save',
	(error: any, doc: IFieldModel, next: HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Name must be unique'))
		} else {
			next(error)
		}
	}
)

export default FieldSchema

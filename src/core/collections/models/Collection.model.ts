import { HookNextFunction, model, Schema } from 'mongoose'

import { ICollectionModel } from '../interfaces/Collection.interfaces'
import { collectionName } from '../utils/schema.utils'
import { FieldTypeSchema } from './FieldType.model'

const CollectionSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			lowercase: true
		},
		fieldTypes: [FieldTypeSchema]
	},
	{ timestamps: true }
)

// Name uniqueness for proper error
CollectionSchema.post(
	'save',
	(error: any, doc: ICollectionModel, next: HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Name must be unique'))
		} else {
			next(error)
		}
	}
)

export default model<ICollectionModel>(collectionName, CollectionSchema)

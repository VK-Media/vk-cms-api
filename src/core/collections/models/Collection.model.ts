import * as mongoose from 'mongoose'

import { ICollectionModel } from '../interfaces/Collection.interfaces'

const CollectionSchema = new mongoose.Schema(
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

CollectionSchema.methods.toJSON = function() {
	const collectionObject: ICollectionModel = this.toObject()
	delete collectionObject.__v

	const id = collectionObject._id
	delete collectionObject._id
	collectionObject.id = id

	return collectionObject
}

// Name uniqueness for proper error
CollectionSchema.post(
	'save',
	(error: any, doc: ICollectionModel, next: mongoose.HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Name must be unique'))
		} else {
			next(error)
		}
	}
)

export default mongoose.model<ICollectionModel>('Collection', CollectionSchema)

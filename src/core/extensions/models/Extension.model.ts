import * as mongoose from 'mongoose'

import { IExtensionModel } from '../interfaces/Extension.interfaces'

const ExtensionSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
			lowercase: true
		},
		description: {
			type: String
		},
		name: {
			type: String,
			required: true
		},
		version: {
			type: String,
			required: true,
			lowercase: true
		},
		enabled: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

ExtensionSchema.methods.toJSON = function() {
	const collectionObject: IExtensionModel = this.toObject()
	delete collectionObject.__v

	const id = collectionObject._id
	delete collectionObject._id
	collectionObject.id = id

	return collectionObject
}

// Key uniqueness for proper error
ExtensionSchema.post(
	'save',
	(error: any, doc: IExtensionModel, next: mongoose.HookNextFunction) => {
		if (error.name === 'MongoError' && error.code === 11000) {
			next(new Error('Key must be unique'))
		} else {
			next(error)
		}
	}
)

export default mongoose.model<IExtensionModel>('Extension', ExtensionSchema)

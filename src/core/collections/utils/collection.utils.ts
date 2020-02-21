import CollectionModel from '../models/Collection.model'

export const getCollectionByName = async (name: string) => {
	const collection = await CollectionModel.findOne({ name })

	if (collection) {
		return collection
	}

	return null
}
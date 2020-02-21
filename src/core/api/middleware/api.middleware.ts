import { NextFunction, Request, Response } from 'express'
import { ICollectionModel } from '../../collections/interfaces/Collection.interfaces'
import CollectionModel from '../../collections/models/Collection.model'
import { getCollectionByName } from '../../collections/utils/collection.utils'
import SingletonModel from '../../singletons/models/Singleton.model'
import { IApiRequest } from '../interfaces/Api.interfaces'

export const objectExists = (type: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const model = apiModels(type)

		if (model) {
			try {
				const object = await model.findOne({ name: req.params.name })

				if (object) {
					req['type'] = type
					req[type] = object
					return next()
				}

				return res.status(404).send({ error: `No item available with the given name` })
			} catch (error) {
				res.status(400).send({ error: error.message })
			}
		}

		return res.status(404).send({ error: `The provided type '${type}' is not a recognized type of the API.` })
	}
}

export const apiAccess = (accessType: string) => {
	return (req: IApiRequest, res: Response, next: NextFunction) => {
		if (req[req.type].api[accessType]) {
			return next()
		}

		return res.status(403).send({ error: `The API does not allow you access to the object with the given name` })
	}
}

export const apiModels = (type: string) => {
	const types = {
		collection: CollectionModel,
		singleton: SingletonModel
	}

	if (type && type in types) return types[type]

	return null
}

export const createCollectionItem = async (req: Request, res: Response, next: NextFunction) => {
	await validateCollectionRequest(req, res, next, 'create')
}

export const readCollectionItem = async (req: Request, res: Response, next: NextFunction) => {
	await validateCollectionRequest(req, res, next, 'read')
}

export const updateCollectionItem = async (req: Request, res: Response, next: NextFunction) => {
	await validateCollectionRequest(req, res, next, 'update')
}

export const deleteCollectionItem = async (req: Request, res: Response, next: NextFunction) => {
	await validateCollectionRequest(req, res, next, 'delete')
}

const validateCollectionRequest = async (req: Request, res: Response, next: NextFunction, access: string) => {
	try {
		const collectionName = req.params.collectionName
		const collection = await getCollectionByName(collectionName)

		if (collection) {
			if (checkCollectionAccess(access, collection, res)) {
				req['collection'] = collection
				next()
			}
		} else {
			return res.status(404).send({
				error: `No collection with the provided name: ${collectionName}`
			})
		}
	} catch (error) {
		return res.status(400).send({ error: error.message })
	}
}

const checkCollectionAccess = (access: string, collection: ICollectionModel, res: Response) => {
	if (collection.api[access]) {
		return true
	} else {
		return res.status(403).send({
			error: `You don't have ${access} access to the collection '${collection.name}' via the API`
		})
	}
}
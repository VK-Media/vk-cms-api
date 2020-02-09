import { NextFunction, Request, Response } from 'express'
import { ICollectionModel } from '../interfaces/Collection.interfaces'

import { getCollectionByName } from '../utils/collection.utils'

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
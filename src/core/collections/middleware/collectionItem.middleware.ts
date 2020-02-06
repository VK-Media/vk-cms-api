import { NextFunction, Request, Response } from 'express'

import { getCollectionByName } from '../utils/collection.utils'

export const validateCollection = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const collectionName = req.params.collectionName
		const collection = await getCollectionByName(collectionName)

		if(collection){
			req['collection'] = collection
			next()
		} else {
			res.status(404).send({
				error: `No collection with the provided name: ${collectionName}`
			})
		}
	} catch (error) {
		res.status(400).send({ error: error.message })
	}
}
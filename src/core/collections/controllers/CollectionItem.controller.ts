import { Response } from 'express'
import { Types } from 'mongoose'

import RestController from '../../rest/controllers/Rest.controller'
import { ICollectionItemRequest } from '../interfaces/CollectionItem.interfaces'
import CollectionItemModel from '../models/CollectionItem.model'

class CollectionItemController extends RestController {
	protected model = CollectionItemModel

	public create = async (req: ICollectionItemRequest, res: Response) => {
		try {
			if (req.collection.api.create) {
				const collectionItem = new this.model(req.body)
				collectionItem.collectionId = req.collection._id
				collectionItem.createdBy = Types.ObjectId('5e246e907bbdb346bb1198e0')
				collectionItem.updatedBy = Types.ObjectId('5e246e907bbdb346bb1198e0')

				await collectionItem.save()

				res.status(201).send(collectionItem)
			} else {
				res.status(403).send({
					error: `You don't have create access to the collection '${req.collection.name}' via the API`
				})
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public getAll = async (req: ICollectionItemRequest, res: Response) => {
		try {
			if (req.collection.api.read) {
				const collectionItems = await this.model.find({ collectionId: req.collection._id })

				res.send(collectionItems)
			} else {
				res.status(403).send({
					error: `You don't have read access to the collection '${req.collection.name}' via the API`
				})
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public getById = async (req: ICollectionItemRequest, res: Response) => {
		try {
			if (req.collection.api.read) {
				const id = req.params.id
				const collectionItem = await this.model.findById(id)

				if (collectionItem) {
					res.send(collectionItem)
				} else {
					res.status(404).send({
						error: `No item with the provided id: ${id}`
					})
				}
			} else {
				res.status(403).send({
					error: `You don't have read access to the collection '${req.collection.name}' via the API`
				})
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public update = async (req: ICollectionItemRequest, res: Response) => {
		try {
			if (req.collection.api.update) {
				const collectionItem = await this.model.findById(req.params.id)

				for (const key in req.body) {
					if (Object.hasOwnProperty.call(req.body, key)) {
						const value = req.body[key]

						if (value) {
							collectionItem[key] = value
						}
					}
				}

				await collectionItem.save()

				res.send(collectionItem)
			} else {
				res.status(403).send({
					error: `You don't have update access to the collection '${req.collection.name}' via the API`
				})
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public delete = async (req: ICollectionItemRequest, res: Response) => {
		try {
			if (req.collection.api.delete) {
				const id = req.params.id

				await this.model.findByIdAndRemove(id)

				res.send({ id })
			} else {
				res.status(403).send({
					error: `You don't have delete access to the collection '${req.collection.name}' via the API`
				})
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}
}

export default CollectionItemController

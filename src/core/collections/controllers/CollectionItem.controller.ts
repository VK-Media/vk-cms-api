import { Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
import { ICollectionItemRequest } from '../interfaces/CollectionItem.interfaces'
import CollectionItemModel from '../models/CollectionItem.model'

class CollectionItemController extends RestController {
	protected model = CollectionItemModel

	public create = async (req: ICollectionItemRequest, res: Response) => {
		try {
			const collectionItem = new this.model(req.body)
			collectionItem.collectionId = req.collection._id

			await collectionItem.save()

			res.status(201).send(collectionItem)
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public getAll = async (req: ICollectionItemRequest, res: Response) => {
		try {
			const collectionItems = await this.model.find({ collectionId: req.collection._id })

			res.send(collectionItems)
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public getById = async (req: ICollectionItemRequest, res: Response) => {
		try {
			const id = req.params.id
			const collectionItem = await this.model.findById(id)

			if (collectionItem) {
				res.send(collectionItem)
			} else {
				res.status(404).send({
					error: `No item with the provided id: ${id}`
				})
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public update = async (req: ICollectionItemRequest, res: Response) => {
		try {
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
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public delete = async (req: ICollectionItemRequest, res: Response) => {
		try {
			const id = req.params.id

			await this.model.findByIdAndRemove(id)

			res.send({ id })
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}
}

export default CollectionItemController

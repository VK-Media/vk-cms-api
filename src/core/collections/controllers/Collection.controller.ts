import { Request, Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
import CollectionModel from '../models/Collection.model'
import CollectionItemModel from '../models/CollectionItem.model'
import FieldTypeModel from '../models/FieldType.model'

class CollectionController extends RestController {
	protected model = CollectionModel

	public addFieldType = async (req: Request, res: Response) => {
		try {
			const collection = await this.model.findById(req.params.id)
			const fieldType = new FieldTypeModel(req.body)

			collection.fieldTypes.push(fieldType)

			await collection.save()

			res.send(collection)
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public getItems = async (req: Request, res: Response) => {
		try {
			const items = await CollectionItemModel.find({ collectionId: req.params.id })

			res.send(items)
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}
}

export default CollectionController

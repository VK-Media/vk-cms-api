import { Response } from 'express'
import FieldTypeModel from '../../fields/models/FieldType.model'
import RestController from '../../rest/controllers/Rest.controller'
import { ICollectionRequest } from '../interfaces/Collection.interfaces'
import CollectionModel from '../models/Collection.model'

class CollectionController extends RestController {
    protected model = CollectionModel

    public create = async (req: ICollectionRequest, res: Response) => {
        try {
            const object = new this.model(req.body)

            await object.save()

            res.status(201).send(object)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public getAll = async (req: ICollectionRequest, res: Response) => {
        try {
            const objects = await this.model.find()

            res.send(objects)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public getById = async (req: ICollectionRequest, res: Response) => {
        res.send(req.collection)
    }

    public update = async (req: ICollectionRequest, res: Response) => {
        try {
            const collection = req.collection

            for (const key in req.body) {
                if (Object.hasOwnProperty.call(req.body, key)) {
                    const value = req.body[key]

                    if (value) {
                        collection[key] = value
                    }
                }
            }

            await collection.save()

            res.send(collection)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public delete = async (req: ICollectionRequest, res: Response) => {
        try {
            const id = req.collection._id

            await req.collection.remove()

            res.send({ id })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public addFieldType = async (req: ICollectionRequest, res: Response) => {
        try {
            const collection = req.collection
            const fieldType = new FieldTypeModel(req.body)

            collection.fieldTypes.push(fieldType)

            await collection.save()

            res.send(collection)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default CollectionController

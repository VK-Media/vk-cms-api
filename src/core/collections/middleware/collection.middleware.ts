import { NextFunction, Response } from 'express'
import { ICollectionRequest } from '../interfaces/Collection.interfaces'
import CollectionModel from '../models/Collection.model'

export const collectionAccess = async (req: ICollectionRequest, res: Response, next: NextFunction) => {
    const collectionModel = CollectionModel

    try {
        const id = req.params.id
        const collection = await collectionModel.findById(id)

        if (collection) {
            if (req.requestingUser.isAdmin() || req.requestingUser.hasAccessToCollection(collection)) {
                req.collection = collection
                next()
            } else {
                res.status(403).send({ error: `You do not have access to the collection with id: ${id}` })
            }
        } else {
            return res.status(404).send({
                error: `No collection with the provided id: ${id}`
            })
        }
    } catch (error) {
        return res.status(400).send({ error: error.message })
    }
}

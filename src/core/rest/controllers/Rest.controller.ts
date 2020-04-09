import { Request, Response } from 'express'
import { Document, Model } from 'mongoose'
import RedisClient from '../../cache/utils/RedisClient'

import RestControllerAbstract from '../abstracts/RestController.abstract'

class RestController extends RestControllerAbstract {
    protected model: Model<Document>

    public create = async (req: Request, res: Response) => {
        try {
            const object = new this.model(req.body)

            await object.save()

            res.status(201).send(object)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public getAll = async (req: Request, res: Response) => {
        try {
            const objects = await this.model.find()

            RedisClient.set(req.route.path, objects);
            res.send(objects)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const object = await this.model.findById(id)

            if (object) {
                res.send(object)
            } else {
                res.status(404).send({
                    error: `No object with the provided id: ${id}`
                })
            }
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
            const object = await this.model.findById(req.params.id)

            for (const key in req.body) {
                if (Object.hasOwnProperty.call(req.body, key)) {
                    const value = req.body[key]

                    if (value) {
                        object[key] = value
                    }
                }
            }

            await object.save()

            res.send(object)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            await this.model.findByIdAndRemove(id)

            res.send({ id })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default RestController

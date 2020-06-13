import { Request, Response } from 'express'
import RedisClient from '../../cache/utils/RedisClient'

import RestController from '../../rest/controllers/Rest.controller'
import { IAuthenticatedRequest } from '../interfaces/Authentication.interfaces'
import UserModel from '../models/User.model'

class UserController extends RestController {
    protected model = UserModel

    public create = async (req: Request, res: Response) => {
        try {
            const user = new this.model(req.body)

            await user.save()

            res.status(201).send({ user, jwt: user.generateAuthToken() })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public getAll = async (req: IAuthenticatedRequest, res: Response) => {
        let limit = 10
        let offset = 0

        const requestingUserId = req.requestingUser._id

        if (typeof req.query.limit === 'string' && typeof req.query.offset === 'string') {
            limit = parseInt(req.query.limit, 10)
            offset = parseInt(req.query.offset, 10)
        }

        try {
            const count = await this.model.find({_id: {$ne: requestingUserId}}).count()
            const objects = await this.model.find({_id: {$ne: requestingUserId}}).skip(offset).limit(limit)

            RedisClient.set(req.route.path, objects)
            res.send({ objects, count })
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
                    error: `No object with this the provided id: ${id}`
                })
            }
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default UserController

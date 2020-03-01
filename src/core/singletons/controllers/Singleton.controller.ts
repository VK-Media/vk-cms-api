import { Response } from 'express'
import { IApiRequest } from '../../api/interfaces/Api.interfaces'
import RestController from '../../rest/controllers/Rest.controller'
import SingletonModel from '../models/Singleton.model'

class SingletonController extends RestController {
    protected model = SingletonModel

    public getByName = async (req: IApiRequest, res: Response) => {
        return res.send(req.singleton)
    }

    public updateByName = async (req: IApiRequest, res: Response) => {
        try {
            for (const key in req.body) {
                if (Object.hasOwnProperty.call(req.body, key)) {
                    const value = req.body[key]

                    if (value) {
                        req.singleton[key] = value
                    }
                }
            }

            await req.singleton.save()

            res.send(req.singleton)
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    public deleteByName = async (req: IApiRequest, res: Response) => {
        try {
            const id = req.singleton.id

            await this.model.findByIdAndRemove(id)

            res.send({ id })
        } catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
}

export default SingletonController

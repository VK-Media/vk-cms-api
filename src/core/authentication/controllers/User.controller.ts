import { Request, Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
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

	public getById = async (req: Request, res: Response) => {
		try {
			const id = req.params.id
			const object = await this.model.findById(id).populate('userGroups')

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

import { Request, Response } from 'express'

import RestController from '../core/controllers/Rest.controller'
import { UserModel } from '../models'

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
}

export default UserController

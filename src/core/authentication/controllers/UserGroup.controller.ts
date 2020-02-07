import { Request, Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
import UserGroupModel from '../models/UserGroup.model'

class UserGroupController extends RestController {
	protected model = UserGroupModel

	public update = async (req: Request, res: Response) => {
		try {
			const userGroup = await this.model.findById(req.params.id)

			if (userGroup.admin) {
				res.status(403).send({ error: 'This is a special user group which cannot be edited or deleted' })
			} else {
				for (const key in req.body) {
					if (Object.hasOwnProperty.call(req.body, key)) {
						const value = req.body[key]

						if (value) {
							userGroup[key] = value
						}
					}
				}

				await userGroup.save()

				res.send(userGroup)
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public delete = async (req: Request, res: Response) => {
		try {
			const id = req.params.id

			const userGroup = await this.model.findById(req.params.id)

			if (userGroup.admin) {
				res.status(403).send({ error: 'This is a special user group which cannot be edited or deleted' })
			} else {
				await userGroup.remove()

				res.send({ id })
			}
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}
}

export default UserGroupController

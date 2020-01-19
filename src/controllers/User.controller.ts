import { Request, Response } from 'express'

import { UserModel } from '../models'

class UserController {
	public createUser = async (req: Request, res: Response) => {
		try {
			const user = new UserModel(req.body)

			await user.save()

			res.status(201).send({ user, jwt: user.generateAuthToken() })
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public getAllUsers = async (req: Request, res: Response) => {
		const users = await UserModel.find()

		res.send(users)
	}

	public getUserById = async (req: Request, res: Response) => {
		try {
			const user = await UserModel.findById(req.params.userId)

			res.send({ user })
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public updateUser = async (req: Request, res: Response) => {
		try {
			console.log(req.body)

			const user = await UserModel.findById(req.params.userId)

			for (const key in req.body) {
				if (Object.hasOwnProperty.call(req.body, key)) {
					const value = req.body[key]

					if (value) {
						user[key] = value
					}
				}
			}

			await user.save()

			res.send(user)
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public deleteUser = async (req: Request, res: Response) => {
		try {
			const id = req.params.userId

			await UserModel.findByIdAndRemove(id)

			res.send({ id })
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}
}

export default UserController

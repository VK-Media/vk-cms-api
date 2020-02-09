import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import UserModel from '../models/User.model'

class AuthenticationController {
	protected model = UserModel

	public register = async (req: Request, res: Response) => {
		try {
			const user = new this.model(req.body)

			await user.save()

			res.status(201).send({ user, jwt: user.generateAuthToken() })
		} catch (error) {
			res.status(400).send({ error: error.message })
		}
	}

	public login = async (req: Request, res: Response) => {
		const user = await UserModel.findOne({
			email: req.body.email
		})

		if (!user) {
			return res.status(400).send({ error: 'Invalid credentials' })
		}

		const correctPassword = await compare(req.body.password, user.password)

		if (correctPassword) {
			res.send({ jwt: await user.generateAuthToken() })
		} else {
			res.status(400).send({ error: 'Invalid credentials' })
		}
	}
}

export default AuthenticationController
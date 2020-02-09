import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import UserModel from '../models/User.model'

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization.split('Bearer ')[1]
		const decoded: any = verify(token, process.env.JWT_SECRET)
		const requestingUser = await UserModel.findById(decoded._id).populate('userGroups')

		if (requestingUser) {
			req['requestingUser'] = requestingUser
			next()
		} else {
			return res.status(404).send({ error: `No user with id: ${decoded._id}` })
		}
	} catch (error) {
		return res.status(401).send({ error: 'Invalid token' })
	}
}
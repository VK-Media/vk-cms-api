import { Request } from 'express'
import { IUserModel } from './User.interfaces'

export interface IAuthenticatedRequest extends Request {
	requestingUser: IUserModel
}
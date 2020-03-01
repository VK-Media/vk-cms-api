import { NextFunction, Response } from 'express'
import { IAuthenticatedRequest } from '../../authentication/interfaces/Authentication.interfaces'

export const hasAccessToModule = (moduleId: string) => {
    return (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
        if (req.requestingUser.hasAccessToModule(moduleId)) {
            next()
        } else {
            res.status(403).send({ error: 'The requesting user does not have access to the requested module' })
        }
    }
}

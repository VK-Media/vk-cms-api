import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import UserModel from '../models/User.model'

class AuthenticationController {
    protected model = UserModel

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

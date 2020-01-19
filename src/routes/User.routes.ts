import * as express from 'express'
import { UserController } from '../controllers'

class UserRoutes {
	public userController: UserController = new UserController()

	public routes(app: express.Application): void {
		app.route('/users')
			.get(this.userController.getAllUsers)
			.post(this.userController.createUser)

		app.route('/users/:userId')
			.get(this.userController.getUserById)
			.patch(this.userController.updateUser)
			.delete(this.userController.deleteUser)
	}
}

export default UserRoutes

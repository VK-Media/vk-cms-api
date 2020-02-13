import { Application } from 'express'
import { hasAccessToModule } from '../../modules/middleware/access.middleware'
import RestRoutes from '../../rest/routes/Rest.routes'
import UserController from '../controllers/User.controller'
import { jwtAuth } from '../middleware/authentication.middleware'

class UserRoutes extends RestRoutes {
	protected controller = new UserController()
	protected moduleId = 'user_module'

	public routes(app: Application): void {
		this.additionalRoutes(app)

		app.route(`/${this.routeKey}`)
			.get(jwtAuth, hasAccessToModule(this.moduleId), this.controller.getAll)
			.post(jwtAuth, hasAccessToModule(this.moduleId), this.controller.create)

		app.route(`/${this.routeKey}/:id`)
			.get(jwtAuth, hasAccessToModule(this.moduleId), this.controller.getById)
			.patch(jwtAuth, hasAccessToModule(this.moduleId), this.controller.update)
			.delete(jwtAuth, hasAccessToModule(this.moduleId), this.controller.delete)
	}
}

export default UserRoutes

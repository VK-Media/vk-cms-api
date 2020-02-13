import {Application} from 'express'
import { hasAccessToModule } from '../../modules/middleware/access.middleware'
import RestRoutes from '../../rest/routes/Rest.routes'
import UserGroupController from '../controllers/UserGroup.controller'
import { jwtAuth } from '../middleware/authentication.middleware'

class UserGroupRoutes extends RestRoutes {
	protected controller = new UserGroupController()
	protected moduleId: 'user_group_module'

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

export default UserGroupRoutes

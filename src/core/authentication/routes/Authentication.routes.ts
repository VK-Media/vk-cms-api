import { Application } from 'express'
import RoutesAbstract from '../../routes/abstracts/Routes.abstract'
import AuthenticationController from '../controllers/Authentication.controller'

class AuthenticationRoutes extends RoutesAbstract {
	protected controller = new AuthenticationController()
	protected routeKey: string

	public routes(app: Application): void {
		app.route(`/${this.routeKey}/login`)
			.post(this.controller.login)
	}
}

export default AuthenticationRoutes

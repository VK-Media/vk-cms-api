import { Application } from 'express'

import AuthenticationController from '../controllers/Authentication.controller'

class AuthenticationRoutes {
	protected controller = new AuthenticationController()
	protected routeKey: string

	constructor(routeKey: string) {
		this.routeKey = routeKey
	}

	public routes(app: Application): void {
		app.route(`/${this.routeKey}/login`)
			.post(this.controller.login)
	}
}

export default AuthenticationRoutes

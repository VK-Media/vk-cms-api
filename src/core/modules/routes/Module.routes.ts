import * as express from 'express'

import ModuleController from '../controllers/Module.controller'

class ModuleRoutes {
	protected controller = new ModuleController()
	protected routeKey: string

	constructor(routeKey: string) {
		this.routeKey = routeKey
	}

	public routes(app: express.Application) {
		app.route(`/${this.routeKey}`).get(
			this.controller.getAvailableModules
		)
	}
}

export default ModuleRoutes

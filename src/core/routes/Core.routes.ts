import * as express from 'express'

import ControllerAbstract from '../abstracts/Controller.abstract'
import RoutesAbstract from '../abstracts/Routes.abstract'

class CoreRoutes extends RoutesAbstract {
	protected controller: ControllerAbstract
	protected routeKey: string

	constructor(controller: ControllerAbstract, routeKey: string) {
		super()

		this.controller = controller
		this.routeKey = routeKey
	}

	public routes(app: express.Application): void {
		app.route(`/${this.routeKey}`)
			.get(this.controller.getAll)
			.post(this.controller.create)

		app.route(`/${this.routeKey}/:id`)
			.get(this.controller.getById)
			.patch(this.controller.update)
			.delete(this.controller.delete)
	}
}

export default CoreRoutes

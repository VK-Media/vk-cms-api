import * as express from 'express'

import RestControllerAbstract from '../abstracts/RestController.abstract'
import RestRoutesAbstract from '../abstracts/RestRoutes.abstract'

class RestRoutes extends RestRoutesAbstract {
	protected controller: RestControllerAbstract
	protected routeKey: string

	constructor(controller: RestControllerAbstract, routeKey: string) {
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

export default RestRoutes

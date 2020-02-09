import { Application } from 'express'
import { jwtAuth } from '../../authentication/middleware/authentication.middleware'
import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionController from '../controllers/Collection.controller'
import { collectionAccess } from '../middleware/collection.middleware'

class CollectionRoutes extends RestRoutes {
	protected controller = new CollectionController()

	public routes(app: Application): void {
		this.additionalRoutes(app)

		app.route(`/${this.routeKey}`)
			.get(jwtAuth, this.controller.getAll)
			.post(jwtAuth, this.controller.create)

		app.route(`/${this.routeKey}/:id`)
			.get(jwtAuth, collectionAccess, this.controller.getById)
			.patch(jwtAuth, collectionAccess, this.controller.update)
			.delete(jwtAuth, collectionAccess, this.controller.delete)

		app.route(`/${this.routeKey}/:id/fieldType`)
			.post(jwtAuth, collectionAccess, this.controller.addFieldType)
	}
}

export default CollectionRoutes

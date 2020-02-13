import { Application } from 'express'
import { jwtAuth } from '../../authentication/middleware/authentication.middleware'
import { hasAccessToModule } from '../../modules/middleware/access.middleware'
import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionController from '../controllers/Collection.controller'
import { collectionAccess } from '../middleware/collection.middleware'

class CollectionRoutes extends RestRoutes {
	protected controller = new CollectionController()
	protected moduleId: 'collection_module'

	public routes(app: Application): void {
		this.additionalRoutes(app)

		app.route(`/${this.routeKey}`)
			.get(jwtAuth, hasAccessToModule(this.moduleId), this.controller.getAll)
			.post(jwtAuth, hasAccessToModule(this.moduleId), this.controller.create)

		app.route(`/${this.routeKey}/:id`)
			.get(jwtAuth, hasAccessToModule(this.moduleId), collectionAccess, this.controller.getById)
			.patch(jwtAuth, hasAccessToModule(this.moduleId), collectionAccess, this.controller.update)
			.delete(jwtAuth, hasAccessToModule(this.moduleId), collectionAccess, this.controller.delete)

		app.route(`/${this.routeKey}/:id/fieldType`)
			.post(jwtAuth, hasAccessToModule(this.moduleId), collectionAccess, this.controller.addFieldType)
	}
}

export default CollectionRoutes

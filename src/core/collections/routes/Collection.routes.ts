import { Application } from 'express'

import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionController from '../controllers/Collection.controller'

class CollectionRoutes extends RestRoutes {
	protected controller = new CollectionController()

	protected additionalRoutes(app: Application): void {
		super.additionalRoutes(app)

		app.route(`/${this.routeKey}/:id/fieldType`)
			.post(this.controller.addFieldType)
	}
}

export default CollectionRoutes

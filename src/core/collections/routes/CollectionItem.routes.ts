import { Application } from 'express'

import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionItemController from '../controllers/CollectionItem.controller'
import { validateCollection } from '../middleware/collectionItem.middleware'

class CollectionItemRoutes extends RestRoutes {
	protected controller = new CollectionItemController()

	protected additionalRoutes(app: Application): void {
		super.additionalRoutes(app)

		app.route(`/api/:collectionName`)
			.get(validateCollection, this.controller.getAll)
			.post(validateCollection, this.controller.create)

		app.route(`/api/:collectionName/:id`)
			.get(validateCollection, this.controller.getById)
			.patch(validateCollection, this.controller.update)
			.delete(validateCollection, this.controller.delete)
	}
}

export default CollectionItemRoutes

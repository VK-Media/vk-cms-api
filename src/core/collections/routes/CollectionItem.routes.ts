import { Application } from 'express'

import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionItemController from '../controllers/CollectionItem.controller'
import {
	createCollectionItem,
	deleteCollectionItem,
	readCollectionItem,
	updateCollectionItem
} from '../middleware/api.middleware'

class CollectionItemRoutes extends RestRoutes {
	protected controller = new CollectionItemController()

	protected additionalRoutes(app: Application): void {
		super.additionalRoutes(app)

		app.route(`/api/:collectionName`)
			.get(readCollectionItem, this.controller.getAll)
			.post(createCollectionItem, this.controller.create)

		app.route(`/api/:collectionName/:id`)
			.get(readCollectionItem, this.controller.getById)
			.patch(updateCollectionItem, this.controller.update)
			.delete(deleteCollectionItem, this.controller.delete)
	}
}

export default CollectionItemRoutes

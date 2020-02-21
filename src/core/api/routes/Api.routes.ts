import { Application } from 'express'
import CollectionItemController from '../../collections/controllers/CollectionItem.controller'
import RoutesAbstract from '../../routes/abstracts/Routes.abstract'
import SingletonController from '../../singletons/controllers/Singleton.controller'
import { apiAccess, objectExists } from '../middleware/api.middleware'

class ApiRoutes extends RoutesAbstract {
	protected collectionItemController = new CollectionItemController()
	protected singletonController = new SingletonController()

	public routes(app: Application): void {
		app.route(`/${this.routeKey}/collections/:name`)
			.get(objectExists('collection'), apiAccess('read'), this.collectionItemController.getAll)
			.post(objectExists('collection'), apiAccess('create'), this.collectionItemController.create)

		app.route(`/${this.routeKey}/collections/:name/:id`)
			.get(objectExists('collection'), apiAccess('read'), this.collectionItemController.getById)
			.patch(objectExists('collection'), apiAccess('update'), this.collectionItemController.update)
			.delete(objectExists('collection'), apiAccess('delete'), this.collectionItemController.delete)

		app.route(`/${this.routeKey}/singletons/:name`)
			.get(objectExists('singleton'), apiAccess('read'), this.singletonController.getByName)
			.patch(objectExists('singleton'), apiAccess('update'), this.singletonController.updateByName)
			.delete(objectExists('singleton'), apiAccess('delete'), this.singletonController.deleteByName)

	}
}

export default ApiRoutes
import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionController from '../controllers/Collection.controller'

class CollectionRoutes extends RestRoutes {
	protected controller = new CollectionController()
}

export default CollectionRoutes

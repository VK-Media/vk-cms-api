import RestRoutes from '../../rest/routes/Rest.routes'
import CollectionItemController from '../controllers/CollectionItem.controller'

class CollectionItemRoutes extends RestRoutes {
	protected controller = new CollectionItemController()
}

export default CollectionItemRoutes

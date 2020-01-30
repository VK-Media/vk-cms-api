import RestController from '../../rest/controllers/Rest.controller'
import CollectionItemModel from '../models/CollectionItem.model'

class CollectionItemController extends RestController {
	protected model = CollectionItemModel
}

export default CollectionItemController

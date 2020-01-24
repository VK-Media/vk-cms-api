import RestController from '../../rest/controllers/Rest.controller'
import CollectionModel from '../models/Collection.model'

class CollectionController extends RestController {
	protected model = CollectionModel
}

export default CollectionController

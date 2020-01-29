import RestController from '../../rest/controllers/Rest.controller'
import UserGroupModel from '../models/UserGroup.model'

class UserGroupController extends RestController {
	protected model = UserGroupModel
}

export default UserGroupController

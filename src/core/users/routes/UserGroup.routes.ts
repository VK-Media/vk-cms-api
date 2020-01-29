import RestRoutes from '../../rest/routes/Rest.routes'
import UserGroupController from '../controllers/UserGroup.controller'

class UserGroupRoutes extends RestRoutes {
	protected controller = new UserGroupController()
}

export default UserGroupRoutes

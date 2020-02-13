import ModuleRestRoutes from '../../rest/routes/ModuleRest.routes'
import UserGroupController from '../controllers/UserGroup.controller'

class UserGroupRoutes extends ModuleRestRoutes {
	protected controller = new UserGroupController()
	protected moduleId: 'user_group_module'
}

export default UserGroupRoutes

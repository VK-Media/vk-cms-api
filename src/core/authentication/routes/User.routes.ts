import ModuleRestRoutes from '../../rest/routes/ModuleRest.routes'
import UserController from '../controllers/User.controller'

class UserRoutes extends ModuleRestRoutes {
	protected controller = new UserController()
	protected moduleId = 'user_module'
}

export default UserRoutes

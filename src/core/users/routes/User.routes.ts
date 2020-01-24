import RestRoutes from '../../rest/routes/Rest.routes'
import UserController from '../controllers/User.controller'

class UserRoutes extends RestRoutes {
	protected controller = new UserController()
}

export default UserRoutes

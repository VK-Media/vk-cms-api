import ModuleRestRoutes from '../../rest/routes/ModuleRest.routes'
import SingletonController from '../controllers/Singleton.controller'

class SingletonRoutes extends ModuleRestRoutes {
    protected controller = new SingletonController()
    protected moduleId: 'singleton_module'
}

export default SingletonRoutes

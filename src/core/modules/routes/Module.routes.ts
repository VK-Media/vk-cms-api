import * as express from 'express'
import RoutesAbstract from '../../routes/abstracts/Routes.abstract'
import ModuleController from '../controllers/Module.controller'

class ModuleRoutes extends RoutesAbstract {
    protected controller = new ModuleController()
    protected routeKey: string

    public routes(app: express.Application) {
        app.route(`/${this.routeKey}`).get(
            this.controller.getAvailableModules
        )
    }
}

export default ModuleRoutes

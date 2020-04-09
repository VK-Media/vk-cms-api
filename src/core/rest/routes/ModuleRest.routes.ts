import { Application } from 'express'
import { jwtAuth } from '../../authentication/middleware/authentication.middleware'
import RedisClient from '../../cache/utils/RedisClient'
import { hasAccessToModule } from '../../modules/middleware/access.middleware'
import ModuleRestRoutesAbstract from '../abstracts/ModuleRestRoutes.abstract'
import RestControllerAbstract from '../abstracts/RestController.abstract'

class ModuleRestRoutes extends ModuleRestRoutesAbstract {
    protected controller: RestControllerAbstract
    protected routeKey: string
    protected moduleId: string

    public routes(app: Application): void {
        this.additionalRoutes(app)

        app.route(`/${this.routeKey}`)
            .get(jwtAuth, RedisClient.get, hasAccessToModule(this.moduleId), this.controller.getAll)
            .post(jwtAuth, hasAccessToModule(this.moduleId), this.controller.create)

        app.route(`/${this.routeKey}/:id`)
            .get(jwtAuth, hasAccessToModule(this.moduleId), this.controller.getById)
            .patch(jwtAuth, hasAccessToModule(this.moduleId), this.controller.update)
            .delete(jwtAuth, hasAccessToModule(this.moduleId), this.controller.delete)
    }
}

export default ModuleRestRoutes

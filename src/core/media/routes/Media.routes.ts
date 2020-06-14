import { Application } from 'express'
import { jwtAuth } from '../../authentication/middleware/authentication.middleware'
import { hasAccessToModule } from '../../modules/middleware/access.middleware'
import RoutesAbstract from '../../routes/abstracts/Routes.abstract'
import MediaController from '../controllers/Media.controller'

class MediaRoutes extends RoutesAbstract {
    protected controller = new MediaController()

    public routes(app: Application): void {
        const moduleId = 'media_module'

        app.route(`/${this.routeKey}`)
            .get(jwtAuth, hasAccessToModule(moduleId), this.controller.getMediaInPath)

        app.route(`/${this.routeKey}/files`)
            .post(jwtAuth, hasAccessToModule(moduleId), this.controller.uploadFile)

        app.route(`/${this.routeKey}/folders`)
            .post(jwtAuth, hasAccessToModule(moduleId), this.controller.createFolder)

        app.route(`/${this.routeKey}/folders`)
            .delete(jwtAuth, hasAccessToModule(moduleId), this.controller.deleteFolder)
    }
}

export default MediaRoutes

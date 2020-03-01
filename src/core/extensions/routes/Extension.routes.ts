import * as express from 'express'

import RestRoutes from '../../rest/routes/Rest.routes'
import ExtensionController from '../controllers/Extension.controller'

class ExtensionRoutes extends RestRoutes {
    protected controller = new ExtensionController()

    protected additionalRoutes(app: express.Application) {
        app.route(`/${this.routeKey}/synchronize`).get(
            this.controller.synchronizeExtensions
        )
    }
}

export default ExtensionRoutes

import { Application } from 'express'

import RestControllerAbstract from '../abstracts/RestController.abstract'
import RestRoutesAbstract from '../abstracts/RestRoutes.abstract'

class RestRoutes extends RestRoutesAbstract {
    protected controller: RestControllerAbstract
    protected routeKey: string

    public routes(app: Application): void {
        this.additionalRoutes(app)

        app.route(`/${this.routeKey}`)
            .get(this.controller.getAll)
            .post(this.controller.create)

        app.route(`/${this.routeKey}/:id`)
            .get(this.controller.getById)
            .patch(this.controller.update)
            .delete(this.controller.delete)
    }
}

export default RestRoutes

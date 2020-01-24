import * as express from 'express'

import RestControllerAbstract from './RestController.abstract'

abstract class RestRoutesAbstract {
	protected abstract controller: RestControllerAbstract
	protected abstract routeKey: string
	public abstract routes(app: express.Application): void
	protected additionalRoutes(app: express.Application): void {}
}

export default RestRoutesAbstract

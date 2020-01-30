import { Application } from 'express'

import RestControllerAbstract from './RestController.abstract'

abstract class RestRoutesAbstract {
	protected abstract controller: RestControllerAbstract
	protected abstract routeKey: string

	public abstract routes(app: Application): void

	protected additionalRoutes(app: Application): void {}
}

export default RestRoutesAbstract

import * as express from 'express'

import ControllerAbstract from './Controller.abstract'

abstract class RoutesAbstract {
	protected abstract controller: ControllerAbstract
	protected abstract routeKey: string
	public abstract routes(app: express.Application): void
}

export default RoutesAbstract

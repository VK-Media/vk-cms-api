import { Application } from 'express'

abstract class RoutesAbstract {
	protected routeKey: string

	protected constructor(routeKey: string) {
		this.routeKey = routeKey
	}

	public abstract routes(app: Application): void

	protected additionalRoutes(app: Application): void {}
}

export default RoutesAbstract

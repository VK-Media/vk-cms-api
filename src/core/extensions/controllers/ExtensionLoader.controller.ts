import * as express from 'express'

import {
	getExtensionRouteFiles,
	getValidExtensions
} from '../utils/extension.util'

class ExtensionLoaderController {
	public loadRoutesFromValidExtensions(app: express.Application): void {
		const validExtensions = getValidExtensions()

		validExtensions.forEach(extensionPath => {
			const routeFiles = getExtensionRouteFiles(extensionPath)

			routeFiles.forEach(routeFileName => {
				this.getRouteClassFromPath(routeFileName).then(result => {})
			})
		})
	}

	private async getRouteClassFromPath(path: string) {
		const test = await import(`../../../.${path}`)

		return test
	}
}

export default ExtensionLoaderController

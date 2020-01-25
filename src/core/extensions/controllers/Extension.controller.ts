import { Request, Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
import ExtensionModel from '../models/Extension.model'
import {
	getConfigurationAsJSON,
	getValidExtensionsPaths
} from '../utils/extension.util'

class ExtensionController extends RestController {
	protected model = ExtensionModel

	public synchronizeExtensions = (req: Request, res: Response): void => {
		const validExtensionsPaths = getValidExtensionsPaths()

		validExtensionsPaths.forEach(async path => {
			const configuration = getConfigurationAsJSON(
				`${path}/extensionConfiguration.json`
			)

			try {
				const extension = await this.model.findOne({
					key: configuration.key
				})

				if (extension) {
					for (const key in configuration) {
						if (configuration.hasOwnProperty(key)) {
							const value = configuration[key]

							if (value) {
								extension[key] = value
							}
						}
					}

					await extension.save()
				} else {
					const newExtension = new this.model(configuration)

					await newExtension.save()
				}
			} catch (error) {
				res.status(400).send({ error: error.message })
			}
		})

		res.send({ message: 'Extensions have been synced' })
	}
}

export default ExtensionController

import { Request, Response } from 'express'

import RestController from '../../rest/controllers/Rest.controller'
import ExtensionModel from '../models/Extension.model'
import { getValidExtensions } from '../utils/extension.util'

class ExtensionController extends RestController {
	protected model = ExtensionModel

	public synchronizeExtensions(req: Request, res: Response): void {
		const validExtensions = getValidExtensions()

		console.log(validExtensions)
		res.send({ message: 'Extensions have been synced' })
	}
}

export default ExtensionController

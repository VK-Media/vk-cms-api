import { Request, Response } from 'express'
import ModuleUtils from '../utils/Module.utils'

class ModuleController {
	public getAvailableModules = (req: Request, res: Response) => {
		res.send(ModuleUtils.getModules())
	}
}

export default ModuleController
import { IModule } from '../interfaces/Module.interfaces'

class ModuleUtils {
	protected modules: IModule[] = []

	public addModule = (module: IModule) => {
		this.modules.push(module)
	}

	public getModules = () => {
		return this.modules
	}

	public loadModules = () => {
	}
}

export default new ModuleUtils()
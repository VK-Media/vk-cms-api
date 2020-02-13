import { IModule } from '../interfaces/Module.interfaces'

class ModuleUtils {
	protected modules: IModule[] = []

	public addModule = (module: IModule) => {
		this.modules.push(module)
	}

	public getModules = () => {
		return this.modules
	}

	public getModuleById = (id: string): IModule | null => {
		for(const module of this.modules){
			if(module.id === id) return module
		}

		return null
	}
}

export default new ModuleUtils()
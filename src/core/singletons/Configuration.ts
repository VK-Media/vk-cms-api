import { IConfiguration } from '../configuration/interfaces/Configuration.interfaces'
import ModuleUtils from '../modules/utils/Module.utils'

class Configuration implements IConfiguration {
    public addModules(): void {
        ModuleUtils.addModule({
            id: 'singleton_module',
            name: 'Singleton Module',
            description: 'A module for managing singletons'
        })
    }
}

export default Configuration

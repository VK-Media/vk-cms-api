import { IConfiguration } from '../configuration/interfaces/Configuration.interfaces'
import ModuleUtils from '../modules/utils/Module.utils'

class Configuration implements IConfiguration {
    public addModules(): void {
        ModuleUtils.addModule({
            id: 'collection_module',
            name: 'Collection Module',
            description: 'A module for managing collections'
        })
    }
}

export default Configuration

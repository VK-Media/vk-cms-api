import { IConfiguration } from '../configuration/interfaces/Configuration.interfaces'
import ModuleUtils from '../modules/utils/Module.utils'

class Configuration implements IConfiguration {
    public addModules(): void {
        ModuleUtils.addModule({
            id: 'media_module',
            name: 'Media Module',
            description: 'A module for managing files and folders'
        })
    }
}

export default Configuration

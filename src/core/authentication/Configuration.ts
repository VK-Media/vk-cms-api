import { IConfiguration } from '../configuration/interfaces/Configuration.interfaces'
import ModuleUtils from '../modules/utils/Module.utils'
import { createAdminUserGroupIfNotExists } from './utils/userGroup.utils'

class Configuration implements IConfiguration {
    public addModules(): void {
        ModuleUtils.addModule({
            id: 'user_module',
            name: 'User Module',
            description: 'A module for managing users'
        })

        ModuleUtils.addModule({
            id: 'user_group_module',
            name: 'User Group Module',
            description: 'A module for managing user groups'
        })
    }

    public additionalConfiguration(): void {
        createAdminUserGroupIfNotExists()
    }
}

export default Configuration

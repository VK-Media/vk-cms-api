import ModuleUtils from '../modules/utils/Module.utils'

export const moduleConfiguration = () => {
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

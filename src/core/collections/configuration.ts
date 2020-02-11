import ModuleUtils from '../modules/utils/Module.utils'

export const moduleConfiguration = () => {
	ModuleUtils.addModule({
		id: 'collection_module',
		name: 'Collection Module',
		description: 'A module for managing collections'
	})
}

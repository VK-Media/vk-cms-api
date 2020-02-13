import RoutesAbstract from '../../routes/abstracts/Routes.abstract'
import RestControllerAbstract from './RestController.abstract'

abstract class ModuleRestRoutesAbstract extends RoutesAbstract {
	protected abstract controller: RestControllerAbstract
	protected abstract moduleId: string
}

export default ModuleRestRoutesAbstract

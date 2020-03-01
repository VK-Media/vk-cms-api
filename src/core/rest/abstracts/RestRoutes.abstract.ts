import RoutesAbstract from '../../routes/abstracts/Routes.abstract'
import RestControllerAbstract from './RestController.abstract'

abstract class RestRoutesAbstract extends RoutesAbstract {
    protected abstract controller: RestControllerAbstract
}

export default RestRoutesAbstract

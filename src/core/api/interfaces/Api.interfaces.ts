import { Request } from 'express'
import { ICollectionModel } from '../../collections/interfaces/Collection.interfaces'
import { ISingletonModel } from '../../singletons/interfaces/Singleton.interfaces'

export interface IApiRequest extends Request {
    collection?: ICollectionModel
    singleton?: ISingletonModel
    type: string
}

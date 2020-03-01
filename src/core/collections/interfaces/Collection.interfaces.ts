import { Request } from 'express'
import { Document, Types } from 'mongoose'
import { IUserModel } from '../../authentication/interfaces/User.interfaces'
import { IFieldTypeModel } from '../../fields/interfaces/FieldType.interfaces'

interface IApiAccess {
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
}

export interface ICollectionModel extends Document {
    _id: Types.ObjectId
    fieldTypes: IFieldTypeModel[]
    api: IApiAccess
    name: string
    access: Types.ObjectId[]
    color: string
    icon: string
}

export interface ICollectionRequest extends Request {
    requestingUser: IUserModel
    collection?: ICollectionModel
}

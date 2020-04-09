import { Document, Types } from 'mongoose'
import { ICollectionModel } from '../../collections/interfaces/Collection.interfaces'
import { Languages } from '../../localization/interfaces/Localization.interfaces'
import { IUserGroupModel } from './UserGroup.interfaces'

export interface IUserModel extends Document {
    _id: Types.ObjectId
    email: string
    password: string
    userGroups: IUserGroupModel[]
    firstName?: string
    lastName?: string
    settings: IUserSettings

    generateAuthToken(): Promise<string>

    hasAccessToCollection(collection: ICollectionModel): boolean

    hasAccessToModule(moduleId: string): boolean

    isAdmin(): boolean
}

export interface IUserSettings {
    language: Languages
}

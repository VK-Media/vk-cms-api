import { Document, Types } from 'mongoose'
import { ICollectionModel } from '../../collections/interfaces/Collection.interfaces'
import { IUserGroupModel } from './UserGroup.interfaces'

export interface IUserModel extends Document {
	_id: Types.ObjectId
	email: string
	password: string
	userGroups: IUserGroupModel[]

	generateAuthToken(): Promise<string>

	hasAccessToCollection(collection: ICollectionModel): boolean

	isAdmin(): boolean
}

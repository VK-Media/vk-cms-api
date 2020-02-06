import { Document, Types } from 'mongoose'
import { ICollectionAccessModel } from './CollectionAccess.interfaces'
import { IFieldTypeModel } from './FieldType.interfaces'

export interface IApiAccess {
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
	access: ICollectionAccessModel[]
	color: string
	icon: string
}

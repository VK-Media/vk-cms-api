import { Document, Types } from 'mongoose'
import { ICollectionAccessModel } from './CollectionAccess.interfaces'
import { IFieldTypeModel } from './FieldType.interfaces'

export interface ICollectionModel extends Document {
	_id: Types.ObjectId
	name: string
	fieldTypes: IFieldTypeModel[]
	access: ICollectionAccessModel[]
	color: string
	icon: string
}

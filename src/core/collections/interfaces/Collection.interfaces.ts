import { Document, Types } from 'mongoose'
import { IFieldTypeModel } from './FieldType.interfaces'

export interface ICollectionModel extends Document {
	_id: Types.ObjectId
	name: string,
	fieldTypes: IFieldTypeModel[]
}

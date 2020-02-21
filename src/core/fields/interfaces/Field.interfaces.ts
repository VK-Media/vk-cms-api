import { Document, Types } from 'mongoose'
import { IFieldTypeModel } from './FieldType.interfaces'

export interface IFieldModel extends Document {
	_id: Types.ObjectId
	fieldType: IFieldTypeModel
	value?: string
}

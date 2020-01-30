import { Document, Types } from 'mongoose'

export interface IFieldTypeModel extends Document {
	_id: Types.ObjectId
	fieldType: FieldTypes
	name: string
}

export enum FieldTypes {
	TEXT = 'TEXT',
	NUMBER = 'NUMBER',
	DATE = 'DATE'
}

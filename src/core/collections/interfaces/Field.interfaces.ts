import { Document, Types } from 'mongoose'

export interface IFieldModel extends Document {
	_id: Types.ObjectId
	fieldType: Types.ObjectId
	value?: string
}

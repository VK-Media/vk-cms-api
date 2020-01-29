import { Document, Types } from 'mongoose'
import { IFieldModel } from './Field.interfaces'

export interface ICollectionModel extends Document {
	_id: Types.ObjectId
	name: string,
	fields: IFieldModel[]
}

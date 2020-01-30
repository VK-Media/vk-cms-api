import { Document, Types } from 'mongoose'
import { IFieldModel } from './Field.interfaces'

export interface ICollectionItemModel extends Document {
	_id: Types.ObjectId
	collectionId: Types.ObjectId
	fields: IFieldModel[]
	createdBy: Types.ObjectId
	updatedBy: Types.ObjectId
}

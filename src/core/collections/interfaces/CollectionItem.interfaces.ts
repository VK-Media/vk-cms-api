import { Request } from 'express'
import { Document, Types } from 'mongoose'
import { IFieldModel } from '../../fields/interfaces/Field.interfaces'
import { ICollectionModel } from './Collection.interfaces'

export interface ICollectionItemModel extends Document {
	_id: Types.ObjectId
	collectionId: Types.ObjectId
	fields: IFieldModel[]
	createdBy?: Types.ObjectId
	updatedBy?: Types.ObjectId
}

export interface ICollectionItemRequest extends Request {
	collection: ICollectionModel
}

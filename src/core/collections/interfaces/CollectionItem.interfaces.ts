import { Request } from 'express'
import { Document, Types } from 'mongoose'

import { ICollectionModel } from './Collection.interfaces'
import { IFieldModel } from './Field.interfaces'

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

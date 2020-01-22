import { Document, Types } from 'mongoose'

export interface ICollectionModel extends Document {
	_id: Types.ObjectId
	name: string
}

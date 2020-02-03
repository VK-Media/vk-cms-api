import { Document, Types } from 'mongoose'

export interface ICollectionAccessModel extends Document {
	_id: Types.ObjectId
	read: boolean
	manage: boolean
	edit: boolean
}

import { Document, Types } from 'mongoose'

export interface IUserGroupModel extends Document {
	_id: Types.ObjectId
	name: string
}

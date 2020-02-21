import { Document, Types } from "mongoose"
import { IFieldModel } from '../../fields/interfaces/Field.interfaces'

interface IApiAccess {
	read: boolean
	update: boolean
	delete: boolean
}

export interface ISingletonModel extends Document {
	_id: Types.ObjectId
	api: IApiAccess
	name: string
	access: Types.ObjectId[]
	color: string
	icon: string
	fields: IFieldModel[]
	createdBy?: Types.ObjectId
	updatedBy?: Types.ObjectId
}
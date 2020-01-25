import { Document, Types } from 'mongoose'

export interface IExtensionModel extends Document {
	_id: Types.ObjectId
	name: string
	version: string
	enabled: boolean
}

export interface IExtensionConfigurationFile {
	name: string
	key: string
	version: string
	description?: string
}

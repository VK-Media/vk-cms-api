import { model, Schema, Types } from 'mongoose'

import { userGroupName, userName } from '../../authentication/utils/schema.utils'
import { IFieldTypeAccessModel } from '../interfaces/FieldTypeAccess.interfaces'
import { fieldTypeAccessName } from '../utils/schema.utils'

export const FieldTypeAccessSchema = new Schema({
	userGroup: { type: Types.ObjectId, ref: userGroupName },
	user: { type: Types.ObjectId, ref: userName }
})

export default model<IFieldTypeAccessModel>(fieldTypeAccessName, FieldTypeAccessSchema)
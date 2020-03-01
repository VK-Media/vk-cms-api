import { model, Schema, Types } from 'mongoose'
import { fieldName, fieldTypeName } from '../../collections/utils/schema.utils'
import { IFieldModel } from '../interfaces/Field.interfaces'

export const FieldSchema = new Schema(
    {
        fieldType: { type: Types.ObjectId, ref: fieldTypeName, required: true },
        value: { type: String }
    },
    { timestamps: true }
)

export default model<IFieldModel>(fieldName, FieldSchema)

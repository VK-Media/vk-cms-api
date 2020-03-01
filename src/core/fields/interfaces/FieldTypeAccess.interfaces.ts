import { Document, Types } from 'mongoose'

export interface IFieldTypeAccessModel extends Document {
    _id: Types.ObjectId
    userGroup: Types.ObjectId
    user: Types.ObjectId
}

import { Document, Types } from 'mongoose'
import { IFieldTypeAccessModel } from './FieldTypeAccess.interfaces'

export interface IFieldTypeModel extends Document {
    _id: Types.ObjectId
    fieldType: FieldTypes
    name: string
    access: IFieldTypeAccessModel[]
}

export enum FieldTypes {
    TEXT = 'TEXT',
    NUMBER = 'NUMBER',
    DATE = 'DATE'
}

import { HookNextFunction, model, Schema, Types } from 'mongoose'
import { userGroupName, userName } from '../../authentication/utils/schema.utils'
import { ICollectionModel } from '../../collections/interfaces/Collection.interfaces'
import { FieldSchema } from '../../fields/models/Field.model'
import { FieldTypeSchema } from '../../fields/models/FieldType.model'
import { ISingletonModel } from '../interfaces/Singleton.interfaces'
import { singletonName } from '../utils/schema.utils'

export const SingletonSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        access: [{ type: Types.ObjectId, ref: userGroupName }],
        api: {
            read: {
                type: Boolean,
                default: true
            },
            update: {
                type: Boolean,
                default: false
            },
            delete: {
                type: Boolean,
                default: false
            }
        },
        color: {
            type: String,
            default: '#cccccc',
            lowercase: true,
            minlength: 7,
            maxlength: 7
        },
        icon: {
            type: String,
            default: 'file'
        },
        fieldTypes: [FieldTypeSchema],
        fields: [FieldSchema],
        createdBy: { type: Types.ObjectId, ref: userName },
        updatedBy: { type: Types.ObjectId, ref: userName }
    },
    { timestamps: true }
)

// Name uniqueness for proper error
SingletonSchema.post(
    'save',
    (error: any, doc: ICollectionModel, next: HookNextFunction) => {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('Name must be unique'))
        } else {
            next(error)
        }
    }
)

export default model<ISingletonModel>(singletonName, SingletonSchema)

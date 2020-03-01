import { HookNextFunction, model, Schema, Types } from 'mongoose'
import { userGroupName } from '../../authentication/utils/schema.utils'
import { FieldTypeSchema } from '../../fields/models/FieldType.model'
import { ICollectionModel } from '../interfaces/Collection.interfaces'
import { collectionName } from '../utils/schema.utils'

const CollectionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        fieldTypes: [FieldTypeSchema],
        access: [{ type: Types.ObjectId, ref: userGroupName }],
        api: {
            create: {
                type: Boolean,
                default: false
            },
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
        }
    },
    { timestamps: true }
)

// Name uniqueness for proper error
CollectionSchema.post(
    'save',
    (error: any, doc: ICollectionModel, next: HookNextFunction) => {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('Name must be unique'))
        } else {
            next(error)
        }
    }
)

export default model<ICollectionModel>(collectionName, CollectionSchema)

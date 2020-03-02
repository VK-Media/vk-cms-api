import { HookNextFunction, model, Schema } from 'mongoose'
import { IContentModel } from '../interfaces/Content.interfaces'
import { contentName } from '../utils/schema.utils'

const ContentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        }
    },
    { timestamps: true }
)

// Name uniqueness for proper error
ContentSchema.post(
    'save',
    (error: any, doc: IContentModel, next: HookNextFunction) => {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('Name must be unique'))
        } else {
            next(error)
        }
    }
)

export default model<IContentModel>(contentName, ContentSchema)

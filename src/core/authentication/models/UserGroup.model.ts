import { HookNextFunction, model, Schema } from 'mongoose'
import { collectionName } from '../../collections/utils/schema.utils'
import { IUserGroupModel } from '../interfaces/UserGroup.interfaces'
import { userGroupName, userName } from '../utils/schema.utils'

export const UserGroupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        admin: {
            type: Boolean,
            default: false
        },
        modules: [{ type: String, lowercase: true, unique: true }]
    },
    { timestamps: true }
)

// Name uniqueness for proper error
UserGroupSchema.post(
    'save',
    (error: any, doc: IUserGroupModel, next: HookNextFunction) => {
        if (error.name === 'MongoError' && error.code === 11000) {
            next(new Error('Name must be unique'))
        } else {
            next(error)
        }
    }
)

// Remove references on remove
UserGroupSchema.pre('remove', function(this: IUserGroupModel, next: HookNextFunction) {
    const userGroup = this

    userGroup.model(userName).update(
        { userGroups: userGroup._id },
        { $pull: { userGroups: userGroup._id } },
        { multi: true },
        next)
})

UserGroupSchema.pre('remove', function(this: IUserGroupModel, next: HookNextFunction) {
    const userGroup = this

    userGroup.model(collectionName).update(
        { access: userGroup._id },
        { $pull: { access: userGroup._id } },
        { multi: true },
        next)
})

export default model<IUserGroupModel>(userGroupName, UserGroupSchema)

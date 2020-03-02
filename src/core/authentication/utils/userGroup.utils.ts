import UserGroupModel from '../models/UserGroup.model'

export const createAdminUserGroupIfNotExists = async () => {
    const currentAdminGroup = await UserGroupModel.find({ name: 'admin' })

    if (!currentAdminGroup.length) {
        const adminGroup = new UserGroupModel({ name: 'admin', admin: true })

        await adminGroup.save()
    }
}

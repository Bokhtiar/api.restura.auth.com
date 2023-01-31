import { Types } from 'mongoose'
import { IUser, IUserCreateUpdate } from '../../../src/types/user/user.types'
import { Models } from '../../models'

/* findOneBykey */
const findOneByKey = async (params: any): Promise<IUser | null> => {
    return await Models.User.findOne({ ...params })
}

/* store document */
const storeDocument = async ({ documents }: { documents: IUserCreateUpdate }): Promise<IUser | null> => {
    const newUser = new Models.User({
        ...documents
    })
    return newUser.save()
}

/* findOneByID */
const findOneById = async ({_id}:{_id:Types.ObjectId}):Promise<IUser | null> => {
    return await Models.User.findById({_id})
}

export const userAuthService = {
    findOneById,
    findOneByKey,
    storeDocument,
}
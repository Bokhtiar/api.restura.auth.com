import { IUser, IUserCreateUpdate } from '../../../src/types/user/user.types'
import { Models } from '../../models'

/* findOneBykey */
const findOneByKey = async (params: any): Promise<IUser | null> => {
    return await Models.User.findOne({ ...params })
}

/* resource list */
const findAll = async (): Promise<IUser[] | []> => {
    return Models.User.find()
}

/* store document */
const storeDocument = async ({ documents }: { documents: IUserCreateUpdate }): Promise<IUser | null> => {
    const newUser = new Models.User({
        ...documents
    })
    return newUser.save()
}

export const userAuthService = {
    findAll,
    findOneByKey,
    storeDocument
}
import mongoose, { get, RootFilterQuery } from "mongoose"
import { updateProfile, user, userPagination, userPaginator } from "../types/user.type"
import { IUserDocument } from "../interfaces/user.interface"
import { QueryHelper } from "../helper/query.helper"
import { User } from "../models/user.model"
import { t } from "elysia"

export const UserService = {
    get: async function (pagination: userPagination, user_id: string): Promise<userPaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id: { $nin: new mongoose.Types.ObjectId(user_id) },
            $and: QueryHelper.parseUserQuery(pagination)
        }
        const query = User.find(filter).sort({ last_active: -1 }
        )
        const skip = pagination.pageSize * (pagination.currentPage)
        query.skip(skip).limit(pagination.pageSize)


        const [docs, total] = await Promise.all([
            query.exec(),
            User.countDocuments(filter).exec()
        ])
        pagination.length = total
        return {
            pagination: pagination,
            items: docs.map((doc: { toUser: () => any }) => doc.toUser())
        }

    },

    getByUserName: async function (username: string): Promise<user> {
        const user = await User.findOne({ username }).exec
        if (user)
            return user.toUser()
        throw new Error(`username: "${username}" not dound !!`)
    },
    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        const user = User.findByIdAndUpdate(user_id, { $set: newProfile }, { new: true, runValidators: true })
        if (user)
            return user.toUser()
        throw new Error('Something went wrong')
    }
}
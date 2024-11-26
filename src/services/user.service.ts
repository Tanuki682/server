import { get } from "mongoose"
import { updateProfile, user, userPagination, userPaginator } from "../types/user.type"

export const UserService = {
    get: function (pagination: userPagination, user_id: string): Promise<userPaginator> {
        throw new Error('not implement')
    },
    getByUserName: function (username: string): Promise<user> {
        throw new Error('not implement')
    },
    updateProfile: function (newProfile: updateProfile, user_id: string): Promise<user> {
        throw new Error('not implement')
    }
}
import mongoose from "mongoose"
import { register, user } from "../types/account.type"
import { Password } from "bun"

type userWithOutID = Omit<user, 'id'>

export interface IUserDocument extends mongoose.Document, userWithOutID {
    password_hash: String

    verifyPassword: (Password: string) => Promise<boolean>
    toUser: () => user
}

export interface IUserModel extends mongoose.Model<IUserDocument> {
    createUser: (registerData: register) => Promise<IUserDocument>
}
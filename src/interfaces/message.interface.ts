import mongoose from "mongoose"
import { message } from "../types/message.type"

type messageWithOutId = Omit<message, 'id' | 'sender' | 'recipient'>
export interface IMessageDocument extends mongoose.Document, messageWithOutId {
    sender: mongoose.Types.ObjectId
    recipent: mongoose.Types.ObjectId
    create_at: Date
    ToMessage: () => message
}

export interface IMessageModel extends mongoose.Model<IMessageDocument> {

}
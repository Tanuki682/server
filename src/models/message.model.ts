import mongoose from "mongoose"
import { IPhotoDocument, IPhotoModel } from "../interfaces/photo.interface"
import { IMessageDocument, IMessageModel } from "../interfaces/message.interface"
import { message } from "../types/message.type"

const schema = new mongoose.Schema<IMessageDocument, IMessageModel>({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    recipent: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    read_at: { type: Date },
    sender_delete: { type: Boolean },
    recipent_delete: { type: Boolean }

}, {
    timestamps: { createdAt: 'created_at' }
})

schema.methods.toMessage = function (): message {
    return {
        id: this._id.toString(),
        sender: this.sender.toString(),
        recipient: this.recipent.toString(),
        content: this.content,
        read_at: this.read_at,
        create_at: this.create_at,
        sender_delete: this.sender_delete,
        recipient_delete: this.recipent_delete,
    }
}

schema.index({ sender: 1, recipient: 1, create_at: 1 })
schema.index({ recipient: 1, sender: 1, create_at: 1 })

export const Message = mongoose.model<IMessageDocument, IMessageModel>("Message", schema)
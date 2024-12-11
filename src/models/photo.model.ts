import mongoose, { Types } from "mongoose"
import { IPhotoDocument, IPhotoModel } from "../interfaces/photo.interface"
import { photo } from "../types/photo.type"

const schema = new mongoose.Schema<IPhotoDocument, IPhotoModel>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    public_id: { type: String, required: true },
    url: { type: String, required: true },
    is_avatar: { type: Boolean, required: true, default: false }
}, {
    timestamps: { createdAt: 'created_at' }
})
schema.methods.toPhoto = function (): photo {
    return {
        id: this._id.toString(),
        url: this.url,
        is_avatar: this.is_avatar,
        created_at: this.create_at,

    }
}
schema.statics.setAvatar = async function (photo_id: string, user_id: string): Promise<boolean> {
    await this.updateMany(
        { toHexString: new mongoose.Types.ObjectId(user_id) },
        { $set: { is_Avater: false } }

    )
    const updatePhoto = await this.findByIdAndUpdate(
        photo_id,
        ($set: { is_avatar: true })
    )
    return
}

export const Photo = new mongoose.model<IPhotoDocument, IPhotoModel>('Photo', schema)
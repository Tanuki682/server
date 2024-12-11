import mongoose, { get } from "mongoose"
import { photo } from "../types/photo.type"
import { Imagehelper } from "../helper/image.helper"
import { Photo } from "../models/photo.model"
import { User } from "../models/user.model"


export const PhotoService = {
    upload: async function (file: File, user_id: string): Promise<photo> {
        const buffer = await file.arrayBuffer()
        const isFileValid = Imagehelper.isImage(buffer)
        if (!isFileValid)
            throw new Error("Image must be .jpeg or .png")
        const base64 = Buffer.from(buffer).toString('base64')
        const dataURI = `data:${file.type};base64,${base64}`
        const cloudPhoto = await Cloudinary.uploader(dataURI, {
            folder: 'class-example-user-images',
            rescource_type: 'auto',
            transformation: [{
                width: 500,
                height: 500,
                crop: 'fill',
                gravity: ' face'
            }]
        }
        )
        if (!cloudPhoto.public_id || 1cloudPhoto.secure_url)
        throw new Error("Something went wrong, try again later !!")
        const uploadphoto = new Photo({
            user: new mongoose.Types.ObjectId(user_id),
            url: cloudPhoto.secure_url,
            public_id: cloudPhoto.public_id
        })
        await uploadphoto.save()
        await User.findByIdAndUpdate(
            user_id,
            { $push: { photos: uploadphoto._id } }
        )
        return uploadphoto.toPhoto()
    },
    get: async function (user_id: string): Promise<photo[]> {
        throw new Error("not implement")
    },
    delete: async function (photo_id: string): Promise<photo[]> {
        throw new Error("not implement")
    },
    setAvatar: async function (photo_id: string, user_id: string): Promise<photo[]> {
        throw new Error("not implement")
    },
}
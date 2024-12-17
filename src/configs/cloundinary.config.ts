import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_Name: Bun.env.clounddinary_Name,
    api_key_KEY: Bun.env.clounddinary_API_KEY,
    api_secret_Name: Bun.env.clounddinary_API_SECRET,
})

export const Cloudinary = cloudinary
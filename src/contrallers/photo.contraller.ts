import Elysia, { error, t } from "elysia"
import { Imagehelper } from "../helper/image.helper"
import { PhotoDto } from "../types/photo.type"
import { AuthMiddlerware } from "../middleware/auth.middleware"
import { PhotoService } from "../services/photo.service"

const _imageDB: { id: string, data: string, type: string }[] = []
export const photoContraller = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
})

    .use(PhotoDto)
    .use(AuthMiddlerware)
    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = 'Bad Request'
            if (error)
                throw error
            throw new Error("Something went wrong, try again later !!")
        }
    }, {
        detail: { summary: "Upload Photo" },
        body: "upload",
        response: "photo"
    }

    )

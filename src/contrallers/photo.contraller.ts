import Elysia, { error, t } from "elysia"
import { PhotoDto } from "../types/photo.type"
import { AuthMiddlerware, AuthPayload } from "../middleware/auth.middleware"
import { PhotoService } from "../services/photo.service"


export const PhotoContraller = new Elysia({
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
        response: "photo",
        isSignIn: true
    }

    )

import Elysia, { error, t } from "elysia"
import { PhotoDto } from "../types/photo.type"
import { AuthMiddlerware, AuthPayload } from "../middleware/auth.middleware"
import { PhotoService } from "../services/photo.service"
import { set } from "mongoose"


export const PhotoController = new Elysia({
    prefix: '/api/photo',
    tags: ['Photo']
})

    .use(PhotoDto)
    .use(AuthMiddlerware)

    .patch('/:photo_id', async ({ params: { photo_id }, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await PhotoService.setAvatar(photo_id, user_id)
            set.status = "No Content"
        } catch {
            set.status = 'Bad Request'
            if (error instanceof Error)
                throw error
            throw new Error("Something went wrong, try again later !!")
        }
    }, {
        detail: { summary: "Delete photo by photo_id" },
        isSignIn: true,
        params: "Photo_id"
    })
    .delete('/:photo_id', async ({ params: { photo_id }, set }) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = "No Content"
        } catch (error) {
            set.status = 'Bad Request'
            if (error instanceof Error)
                throw error
            throw new Error("Something went wrong, try again later !!")
        }
    }, {
        detail: { summary: "Delete photo by photo_id" },
        isSignIn: true,
        params: "Photo_id"
    })
    .get('/', async ({ Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.get("")
    }, {
        detail: { summary: "Get photo[] by user_id" },
        isSignIn: true,
        response: "photos"

    })
    .post('/', async ({ body: { file }, set, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = 'Bad Request'
            if (error instanceof Error)
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

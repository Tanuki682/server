import Elysia from "elysia"
import { AuthMiddlerware, AuthPayload } from "../middleware/auth.middleware"
import { LikeService } from "../services/likes.serviece"
import { UserDto } from "../types/user.type"


export const LikeController = new Elysia({
    prefix: '/api/photo',
    tags: ['Photo']
})
    .use(AuthMiddlerware)
    .use(UserDto)

    .put('/', async ({ body: { target_id }, set, Auth }): Promise<void> => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await LikeService.toggleLike(user_id, target_id)
            set.status = 400
        } catch (error) {
            set.status = "Bad Request"
            throw error
        }
    }, {

        detail: { summary: "Toggle Like" },
        isSignIn: true,
        body: "target_id"
    })
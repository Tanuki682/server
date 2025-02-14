import Elysia, { t } from "elysia"
import { AuthMiddlerware, AuthPayload } from "../middleware/auth.middleware"
import { UserDto } from "../types/user.type"
import { UserService } from "../services/user.service"


export const UserContller = new Elysia({
    prefix: '/api/user',
    tags: ['User']
})
    .use(UserDto)
    .use(AuthMiddlerware)
    .get('/all', () => {
        return {
            user: [
                { id: '1212', name: 'Tauki' },
                { id: '1221', name: 'zero' }]
        }
    })

    .get('/:username', ({ params: { username } }) => {
        return UserService.getByuserName(username)
    }, {
        detail: { summary: "Get User By Username " },
        // query: t.Object({
        //     username: t.String()
        // }),
        response: "user",
        isSignIn: true,
    })

    .get('/', ({ query, Auth }) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query, user_id)
    }, {
        detail: { summary: "Get User" },
        query: "pagination",
        response: "users",
        isSignIn: true
    })
    .patch('/', async ({ body, set, Auth }) => {
        try {
            const user_id = (Auth.payload as AuthPayload).id
            await UserService.updateProfile(body, user_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error)
                throw new Error(error.message)
        }
        set.status = 500
        throw new Error("Somwthing went Wrong , try again later")
    }, {
        detail: { summary: "Update Profile" },
        body: "updateProfile",
        // response: "user",
        isSignIn: true
    })

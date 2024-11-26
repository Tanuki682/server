import Elysia from "elysia"
import { AuthMiddlerware } from "../middleware/auth.middleware"

export const UserContller = new Elysia({
    prefix: ('/api/user'),
    tags: ['user']
})
    .use(AuthMiddlerware)
    .get('/all', () => {
        return {
            text: "Hello Word"
        }
    }, {
        isSignIn: true
    })


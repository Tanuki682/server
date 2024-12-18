import { JWTPayloadSpec } from "@elysiajs/jwt"
import Elysia from "elysia"
import { jwtConfig } from "../configs/jwt.config"
type AuthContext = {
    Auth: {
        payload: false | (Record<string, string | number> & JWTPayloadSpec)

    }
}
export type AuthPayload = { id: string }
export const AuthMiddlerware = new Elysia({ name: 'Middleware.Auth' })

    .use(jwtConfig)
    .derive({ as: 'scoped' }, async ({ headers, jwt }): Promise<AuthContext> => {
        let payload: false | (Record<string, string | number> & JWTPayloadSpec) = false

        //Extract the 'Authorization' header from the incoming request
        const auth = headers['authorization']
        const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null
        if (token) {
            payload = await jwt.verify(token)
            // console.log("Decoded Payload:", payload)
            if (!payload) {
                throw new Error("Token has expired")
            }
        }
        return {
            Auth: { payload }
        }
    })
    .macro(({ onBeforeHandle }) => ({
        // This is declaring a service method
        isSignIn(value: boolean) {
            if (!value) return
            onBeforeHandle((context) => {
                const { Auth, error } = context as AuthContext & { error: Function }
                if (!Auth.payload || !Auth.payload.id)
                    return error(401)
            })
        }
    })

    )

import jwt from "@elysiajs/jwt"

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_secret || 'klasjdpjawofmpodj',
    exp: '1d'

})
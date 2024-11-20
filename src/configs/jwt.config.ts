import jwt from "@elysiajs/jwt"

export const jwtConfig = jwt({
    name: 'jwt',
    secret: Bun.env.JWT_secret || 'kl;asjdpjawofmpodj',
    exp: '1d'

})
import { Elysia, t } from "elysia"
import { swaggerConfig } from "./configs/swagger.config"
import { tlsConfig } from "./configs/tls.config"
import { mongoDB } from "./configs/database.config"
import cors from "@elysiajs/cors"
import { jwtConfig } from "./configs/jwt.config"
import { AccountContraller } from "./contrallers/account.contraller"
import { UserContller } from "./contrallers/user.contloller"
import staticPlugin from "@elysiajs/static"
import { PhotoController } from "./contrallers/photo.contraller"
import { LikeController } from "./contrallers/like.contraller"

mongoDB.connect()

const app = new Elysia()
  .use(swaggerConfig)
  .use(cors())
  .use(jwtConfig)
  .use(AccountContraller)
  .use(UserContller)
  .use(LikeController)
  .use(PhotoController)


  .use(staticPlugin({
    assets: "public/upload",
    prefix: "/prefix"
  }))

  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'https'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)




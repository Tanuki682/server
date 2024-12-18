import { Elysia, t } from "elysia"
import { swaggerConfig } from "./configs/swagger.config"
import { tlsConfig } from "./configs/tls.config"
import { MongoDB } from "./configs/database.config"
import cors from "@elysiajs/cors"
import { jwtConfig } from "./configs/jwt.config"
import { AccountContraller } from "./contrallers/account.contraller"
import { UserContller } from "./contrallers/user.contloller"
import staticPlugin from "@elysiajs/static"
import { PhotoController } from "./contrallers/photo.contraller"

MongoDB.connect()

const app = new Elysia()
  .use(staticPlugin())
  .use(PhotoController)
  .use(swaggerConfig)
  // .use(example)
  .use(cors())
  .use(jwtConfig)
  .use(AccountContraller)
  .use(UserContller)
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'https'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)




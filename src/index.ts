import { Elysia, t } from "elysia"
import { example } from "./contrallers/examplt.contraller"
import { swaggerConfig } from "./configs/swagger.config"
import { tlsConfig } from "./configs/tls.config"
import cors from "@elysiajs/cors"

const app = new Elysia()

  .use(swaggerConfig)
  .use(example)
  .use(cors())
  .listen({
    port: Bun.env.PORT || 8000,
    tls: tlsConfig
  })

let protocol = 'http'
if ('cert' in tlsConfig)
  protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
function cores(): any {
  throw new Error("Function not implemented.")
}


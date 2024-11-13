import swagger from "@elysiajs/swagger"

export const swaggerConfig = swagger({
    path: 'api-doc',
    documentation: {
        info: {
            title: "Tinner App API",
            version: "0.0.1"
        }
    }
})
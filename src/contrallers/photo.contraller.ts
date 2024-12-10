import Elysia, { t } from "elysia"

export const photoContraller = new Elysia({
    prefix: "api/photo",
    tags: ['Photo']
})

    .post('/', async ({ body: { imgFile } }) => {
        const filename = `${Date.now()}-${imgFile.name}`
        const filePath = `Public/uploads/${filename}`
        const buffer = await imgFile.arrayBuffer()
        await Bun.write(filePath, buffer)

        return `https://localhost:8000/img`
    }, {
        detail: { summary: "Upload Photo" },
        body: t.Object({
            imgFile: t.File()
        })
    }

    )

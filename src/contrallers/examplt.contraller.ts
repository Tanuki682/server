import Elysia, { t } from "elysia"


export const example = new Elysia()
    .get("/", () => "Hello Word", {
        detail: {
            tax: ["example"],
            summary: "Get Hello Word",
            description: "bra bra bra"

        }
    })
    .post("/about", ({ body }) => {
        return {
            id: 'xxx',
            msg: 'Hello' + body.name
        }
    }, {
        body: t.Object({
            name: t.String()
        }),
        detail: {
            tax: ["example"],
            summary: "About",
            description: "bra bra bra"

        }
    })
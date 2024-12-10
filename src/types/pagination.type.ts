import { Static, t, TSchema } from "elysia"

export const _Pagination = t.Object({
    pageSize: t.Number(),
    currentPage: t.Number(),
    length: t.Optional(t.Number()),

})

export type pagination = Static<typeof _Pagination>

export function CreatePagination<T extends TSchema, U extends TSchema>(itemType: T, paginatorType: U) {
    return t.Object({
        items: t.Array(itemType),
        pagination: paginatorType
    })
}
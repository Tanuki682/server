import { Static, t } from "elysia"
import { _register } from "./register.type"



export const _profile = t.Object({
    ...t.Omit(_register, ['password']).properties,
    id: t.String(),
    introduction: t.Optional(t.String()),
    interest: t.Optional(t.String()),
    location: t.Optional(t.String()),
    age: t.Optional(t.String()),
    last_active: t.Optional(t.Date()),
    created_at: t.Optional(t.Date()),
    update_at: t.Optional(t.Date()),


    //todo:implement upload feature
    //photo: photo_id[]
})

export const _user = t.Object({
    ..._profile.properties,
    //todo: implement like feature
    //fllower: profile[]
    //fllowing: profile[]
})

export type user = Static<typeof _user>

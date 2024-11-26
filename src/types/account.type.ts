import { password } from "bun"
import Elysia, { Static, t } from "elysia"

export const _login = t.Object({
    username: t.String(),
    password: t.String()

})

export const _register = t.Object({
    username: t.String(),
    password: t.String(),
    display_name: t.String(),
    date_of_birth: t.Optional(t.Date()),
    looking_for: t.Union([t.Literal('male'), t.Literal('female'), t.Literal('all')]),
    gender: t.Optional(t.Union([t.Literal('male'), t.Literal('female'), t.Literal('all')]))
})

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

export const userAndToken = t.Object({
    user: _user,
    token: t.String()
})

export const AccountDto = new Elysia().model({
    //request
    register: _register,
    login: _login,

    //response
    user_and_token: userAndToken
})

export type user = Static<typeof _user>
export type register = Static<typeof _register>
export type login = Static<typeof _login>
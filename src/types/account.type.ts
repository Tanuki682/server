import { password } from "bun"
import Elysia, { Static, t } from "elysia"
import { _user } from "./user.type"

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


export type register = Static<typeof _register>
export type login = Static<typeof _login>
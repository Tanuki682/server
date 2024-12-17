import { connect } from "bun"
import mongoose from "mongoose"
import { file } from "bun"

const username = Bun.env.MONGKO_DB_USERNAME || 'your-username'
const password = Bun.env.MONGKO_DB_PASSWORD || 'your-password'
const db_name = Bun.env.MONGKO_DB_NAME || 'tinner_class_example'
const uri = `mongodb+srv://${username}:${password}@cluster0.xxfaz.mongodb.net/?retryWrites=true&w=majority&appName=${db_name} `

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log("---- MongoDB Connected ----")
        } catch (error) {
            console.error("---- MongoDB Connection Error ----", error)
            console.error(error)
        }
    }
}


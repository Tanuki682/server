import { connect } from "bun"
import mongoose from "mongoose"

const username = Bun.env.MONGKO_DB_USERNAME || 'your-username'
const password = Bun.env.MONGKO_DB_PASSWORD || 'your-password'
const db_name = Bun.env.MONGKO_DBNAME || 'tinner_app'
const uri = `mongodb+srv://${username}:${password}@cluster0.xxfaz.mongodb.net/?retryWrites=true&w=majority&appName=${db_name} `

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log("---- MongoDB Connected ----")
        } catch (error) {
            console.log("---- MongoDB Connection Error ----", error)
            console.log("error:", error)
        }
    }
}


import { connect } from "bun"
import mongoose from "mongoose"

const username = Bun.env.MONGO_DB_USERNAME || 'thanawatnh'
const password = Bun.env.MONGO_DB_PASSWORD || 'HRgpdAdXDF4Q4QLO'
const db_name = Bun.env.MONGO_DBNAME || 'TinnerAPP'


const uri = `mongodb+srv://${username}:${password}@cluster0.xxfaz.mongodb.net/${db_name}?retryWrites=true&w=majority`


export const MongoDB = {
    connect: async () => {     ///function() or =>
        try {
            await mongoose.connect(uri)
            console.log('-----MongoDB Conneted -----')
        } catch (error) {
            console.error('----- MongoDB Connetion error -----')
            console.error(error)
        }
    }
}
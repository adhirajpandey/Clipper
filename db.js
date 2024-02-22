const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({
    path: './.env'
})

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error)
        process.exit(1)
    }
}

module.exports ={
    connectDB
}
const express = require("express")
const cors = require("cors")
const path = require('path')
const dotenv = require("dotenv")

const connectDB = require("./database/connectMongo")
const clipRoute = require("./routes/clip")

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 8000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())

app.use('/clip', clipRoute)

app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "public", "html", "index.html"))
})


connectDB()

app.listen(PORT, (err) => {
    if (err) {
        console.error("Error starting the server:", err)
    } else {
        console.log(`Server is running on port ${PORT}`)
    }
})

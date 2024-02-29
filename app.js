const express = require("express")
const cors = require("cors")
const path = require('path')
const dotenv = require("dotenv").config()

const connectDB = require("./database/connectMongo")
const clipRoute = require("./routes/clip")
const userRoute = require("./routes/user")
const authMiddleware = require("./middlewares/authentication")


const PORT = process.env.PORT || 8000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(cors())

app.use('/clip', authMiddleware, clipRoute)
app.use('/user', userRoute)

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

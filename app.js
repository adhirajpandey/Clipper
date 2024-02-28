const express = require("express")
const cors = require("cors")

const { connectDB } = require("./db")
const clipRoute = require("./routes/clip")


const app = express()


app.use(express.json())
app.use(cors())
app.use('/clip', clipRoute)


app.get("/", (req, resp) => {
    resp.sendFile(__dirname + "/index.html")
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running at port : 8000")
    })
})
.catch((err) => {
    console.log("MONGO DB initial connection failed !!! ", err)
})


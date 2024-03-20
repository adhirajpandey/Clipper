const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const connectDB = require("./database/connectMongo")
const staticRoute = require("./routes/static")
const clipRoute = require("./routes/clip")
const userRoute = require("./routes/user")
const premiumRoute = require("./routes/premium")
const authMiddleware = require("./middlewares/authentication")
const limiter = require("./utils/rateLimiter")

const PORT = process.env.PORT || 8000

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(cookieParser())

app.use("/", staticRoute)
app.use("/clip", clipRoute)
app.use("/user", userRoute)
app.use("/premium", authMiddleware, premiumRoute)

connectDB()

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting the server:", err)
	} else {
		console.log(`Server is running on port ${PORT}`)
	}
})

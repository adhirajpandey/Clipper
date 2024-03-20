const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const passport = require("passport")
const session = require("express-session")
require("dotenv").config()

const connectDB = require("./database/connectMongo")
const staticRoute = require("./routes/static")
const clipRoute = require("./routes/clip")
const userRoute = require("./routes/user")
const premiumRoute = require("./routes/premium")
const oauthRoute = require("./routes/oauth")
const authMiddleware = require("./middlewares/authentication")
const limiter = require("./utils/rateLimiter")

const PORT = process.env.PORT || 8000

const app = express()

app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false,
	})
)

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors())
app.use(limiter)
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

app.use("/", staticRoute)
app.use("/clip", clipRoute)
app.use("/user", userRoute)
app.use("/premium", authMiddleware, premiumRoute)
app.use("/oauth", oauthRoute)

connectDB()

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting the server:", err)
	} else {
		console.log(`Server is running on port ${PORT}`)
	}
})

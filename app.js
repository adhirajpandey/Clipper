const express = require("express")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

const connectDB = require("./database/connectMongo")
const clipRoute = require("./routes/clip")
const userRoute = require("./routes/user")
const premiumRoute = require("./routes/premium")
const authMiddleware = require("./middlewares/authentication")
const { HTML_DIR } = require("./configs")
const limiter = require("./utils/rateLimiter")

const PORT = process.env.PORT || 8000

const app = express()

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(cors())
app.use(limiter)

// app.use("/clip", authMiddleware, clipRoute)
app.use("/clip", clipRoute)
app.use("/user", userRoute)
app.use("/premium", premiumRoute)

app.get("/", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "index.html"))
})
app.get("/login", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "login.html"))
})
app.get("/signup", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "signup.html"))
})

connectDB()

app.listen(PORT, (err) => {
	if (err) {
		console.error("Error starting the server:", err)
	} else {
		console.log(`Server is running on port ${PORT}`)
	}
})

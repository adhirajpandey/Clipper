const express = require("express")
const path = require("path")
const { HTML_DIR } = require("../configs")

const router = express.Router()

router.get("/", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "index.html"))
})
router.get("/login", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "login.html"))
})
router.get("/signup", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "signup.html"))
})
router.get("/policy", (req, resp) => {
	resp.sendFile(path.join(HTML_DIR, "policy.html"))
})

module.exports = router

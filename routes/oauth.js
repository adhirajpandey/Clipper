const express = require("express")
const {
	googleLogin,
	googleRedirect,
	googlePassportAuth,
} = require("../controllers/oauth")

const router = express.Router()

router.get("/google", googleLogin)
router.get("/google-redirect", googlePassportAuth, googleRedirect)

module.exports = router

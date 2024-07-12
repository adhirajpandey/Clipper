const express = require("express")
const { callback } = require("../controllers/razpay")

const router = express.Router()

router.post("/callback", callback)

module.exports = router

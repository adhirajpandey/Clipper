const express = require("express")
const { premiumClipper } = require("../controllers/premium")

const router = express.Router()

router.get("/", premiumClipper)

module.exports = router

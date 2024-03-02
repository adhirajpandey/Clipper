const express = require("express")
const { premiumClipper, premiumClipSave, premiumClipView } = require("../controllers/premium")

const router = express.Router()

router.get("/", premiumClipper)
router.post("/clip/save", premiumClipSave)
router.post("/clip/view", premiumClipView)


module.exports = router

const express = require("express")
const {
	premiumClipper,
	premiumClipSave,
	premiumClipView,
	dashboard,
	dashboardData,
} = require("../controllers/premium")

const router = express.Router()

router.get("/", premiumClipper)
router.post("/clip/save", premiumClipSave)
router.post("/clip/view", premiumClipView)
router.get("/dashboard", dashboard)
router.post("/dashboard", dashboardData)

module.exports = router

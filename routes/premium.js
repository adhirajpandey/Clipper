const express = require("express")
const {
	premiumClipper,
	premiumClipSave,
	premiumClipView,
	dashboard,
	dashboardData,
	deleteClip,
} = require("../controllers/premium")

const router = express.Router()

router.get("/", premiumClipper)
router.post("/clip/save", premiumClipSave)
router.post("/clip/view", premiumClipView)
router.delete("/clip", deleteClip)
router.get("/dashboard", dashboard)
router.post("/dashboard", dashboardData)

module.exports = router

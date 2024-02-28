const express = require("express")
const { saveClip, showClip } = require("../controllers/clip")
const router = express.Router()

router.post('/save', saveClip)
router.get('/:clipId', showClip)

module.exports = router
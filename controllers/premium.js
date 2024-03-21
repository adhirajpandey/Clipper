const path = require("path")
const { HTML_DIR } = require("../configs/index")
const Clipboard = require("../models/clip")
const generateClipId = require("../utils/generateClipId")
const generateQR = require("../utils/generateQR")

async function premiumClipper(req, resp) {
	try {
		resp.sendFile(path.join(HTML_DIR, "premium.html"))
	} catch (error) {
		console.error("Error rendering premium page:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

async function premiumClipSave(req, resp) {
	try {
		const clipboardText = req.body.clipboardText
		const clipId = generateClipId(8)
		const password = req.body.clipPassword || null

		let newClipboardItem = new Clipboard({
			clipId: clipId,
			clipString: clipboardText,
			clipPassword: password,
		})

		const response = await newClipboardItem.save()

		const BASE_URL = process.env.BASE_URL || "http://localhost:8000"
		const clipUrl = `${BASE_URL}/clip/${clipId}`

		await generateQR(clipUrl, clipId)

		resp.json({
			clip: response,
		})
	} catch (error) {
		console.error("Error saving clipboard item:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

async function premiumClipView(req, resp) {
	const clipId = req.body.clipId || null
	const password = req.body.clipPassword || null

	if (!clipId || !password) {
		resp.status(400).json({ error: "Clip ID and Password are required" })
		return
	} else {
		const clip = await Clipboard.findOne({ clipId: clipId })
		if (!clip) {
			resp.status(404).json({ error: "Clip not found" })
			return
		} else {
			if (clip.clipPassword !== password) {
				resp.status(401).json({ error: "Invalid Password" })
				return
			} else {
				resp.json({
					message: "Valid Password",
					clip: { clipString: clip.clipString },
				})
			}
		}
	}
}

module.exports = {
	premiumClipper,
	premiumClipSave,
	premiumClipView,
}

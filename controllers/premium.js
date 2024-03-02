const path = require("path")
const { HTML_DIR } = require("../configs/index")
const Clipboard = require("../models/clip")
const generateClipId = require("../utils/generateClipId")

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

		console.log(clipboardText, clipId, password)
		console.log(req.headers.authorization)

		let newClipboardItem = new Clipboard({
			clipId: clipId,
			clipString: clipboardText,
			clipPassword: password,
		})

		const response = await newClipboardItem.save()

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

	console.log(clipId, password)

	if (!clipId || !password) {
		console.log("here1")
		resp.status(400).json({ error: "Clip ID and Password are required" })
		return
	} else {
		console.log("here2")
		const clip = await Clipboard.findOne({ clipId: clipId })
		if (!clip) {
			console.log("here3")
			resp.status(404).json({ error: "Clip not found" })
			return
		} else {
			console.log(clip.clipPassword)
			if (clip.clipPassword !== password) {
				console.log("here4")
				resp.status(401).json({ error: "Invalid Password" })
				return
			} else {
				console.log("here5")
				resp.json({
					message: "Valid Password",
					clip: {clipString: clip.clipString},
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

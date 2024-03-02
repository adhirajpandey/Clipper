const Clipboard = require("../models/clip")
const generateClipId = require("../utils/generateClipId")
const { HTML_DIR } = require("../configs")
const path = require("path")

async function saveClip(req, resp) {
	try {
		const clipboardText = req.body.clipboardText
		const clipId = generateClipId(8)

		const newClipboardItem = new Clipboard({
			clipId: clipId,
			clipString: clipboardText,
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

async function showClip(req, res) {
	const clipId = req.params.clipId
	try {
		const clip = await Clipboard.findOne({ clipId })

		if (!clip) {
			return res.status(404).json({ error: "Clip not found" })
		}

		if (!clip.clipPassword) {
			const formattedClipString = `<pre>${clip.clipString}</pre>`
			res.send(formattedClipString)
		} else {
			res.sendFile(path.join(HTML_DIR, "protected.html"))
		}
	} catch (error) {
		console.error("Error retrieving clip:", error)
		res.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = {
	saveClip,
	showClip,
}

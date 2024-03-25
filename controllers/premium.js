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
		const userId = req.headers.id

		let newClipboardItem = new Clipboard({
			clipId: clipId,
			clipString: clipboardText,
			clipPassword: password,
			clipOwner: userId,
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

async function dashboard(req, resp) {
	try {
		resp.sendFile(path.join(HTML_DIR, "dashboard.html"))
	} catch (error) {
		console.error("Error sending dashboard page:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

async function dashboardData(req, resp) {
	try {
		const userEmail = req.headers.email
		const userId = req.headers.id

		const clips = await Clipboard.find({ clipOwner: userId })

		resp.json({ clips: clips, email: userEmail })
	} catch (error) {
		console.error("Error sending dashboard data:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

async function deleteClip(req, resp) {
	try {
		const userEmail = req.headers.email
		const userId = req.headers.id

		const clipId = req.body.clipId

		const clip = await Clipboard.findOne({ clipId: clipId }).populate(
			"clipOwner"
		)

		if (clip.clipOwner.email !== userEmail) {
			resp.status(401).json({ error: "Unauthorized" })
		} else {
			await Clipboard.deleteOne({ clipId: clipId })
			resp.status(200).json({ message: "Clip Deleted" })
		}
	} catch (error) {
		console.error("Error deleting clip:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = {
	premiumClipper,
	premiumClipSave,
	premiumClipView,
	dashboard,
	dashboardData,
	deleteClip,
}

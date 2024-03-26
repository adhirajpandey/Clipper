const Clipboard = require("../models/clip")

async function ifSlugAvailable(slug) {
	try {
		const clip = await Clipboard.findOne({ clipId: slug })
		if (clip) {
			return false
		} else {
			return true
		}
	} catch (error) {
		console.error("Error checking if slug is available:", error)
		return false
	}
}

module.exports = ifSlugAvailable

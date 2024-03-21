const path = require("path")

const HTML_DIR = path.join(__dirname, "..", "public", "html")
const IMG_DIR = path.join(__dirname, "..", "public", "images")

const RATE_LIMITING_WINDOW_MIN = 5
const RATE_LIMITING_REQUESTS = 100

module.exports = {
	HTML_DIR,
	RATE_LIMITING_WINDOW_MIN,
	RATE_LIMITING_REQUESTS,
	IMG_DIR,
}

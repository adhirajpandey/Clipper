const path = require("path")
const { HTML_DIR } = require("../configs/index")

async function premiumClipper(req, resp) {
	resp.sendFile(path.join(HTML_DIR, "premium.html"))
}

module.exports = {
	premiumClipper,
}

const QRCode = require("qrcode")
const path = require("path")
const { IMG_DIR } = require("../configs")

const basePath = path.join(IMG_DIR, "qrcodes/")

function generateQR(text, name) {
	const path = `${basePath}${name}.png`
	QRCode.toFile(
		path,
		text,
		{
			errorCorrectionLevel: "H",
		},
		function (err) {
			if (err) throw err
			console.log("QR code saved!")
		}
	)
}

module.exports = generateQR

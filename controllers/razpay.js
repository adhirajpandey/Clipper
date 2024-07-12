async function callback(req, resp) {
	try {
		const body = req.body
        console.log("Razorpay Callback: ", body)

		resp.json({
			message: body,
		})
	} catch (error) {
		console.error("Error in razor pay callback:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = {
    callback
}
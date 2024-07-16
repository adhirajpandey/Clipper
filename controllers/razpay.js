const User = require("../models/user");
const Payment = require("../models/payment");

async function callback(req, resp) {
	try {
		const webhookBody = req.body
		if (webhookBody.event !== "payment.captured") {
			return resp.status(200).json({message: webhookBody})
		}

		const userEmail = webhookBody.payload.payment.entity.notes.email || webhookBody.payload.payment.entity.email 
		const razorpayId = webhookBody.payload.payment.entity.id

		const invoicePayload = new Payment({
			user: userEmail,
			razorpayId: razorpayId,
			webhookPayload: webhookBody,
		})
		
		const response = await invoicePayload.save()
		const user = await User.findOne({"email": userEmail})

		if (!user) {
			return resp.json({message: "User not found"})
		}

		user.invoice = response._id
		user.category = "elite"

		await user.save()

		resp.json({
			message: webhookBody,
		})
		
	} catch (error) {
		console.error("Error in razor pay callback:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = {
    callback
}
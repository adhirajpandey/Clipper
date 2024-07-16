const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
		},
		category: {
			type: String,
			required: true,
			default: "normal",
		},
		payment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "payments",
			required: false
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
)

const User = mongoose.model("users", userSchema)

module.exports = User

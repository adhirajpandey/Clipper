const mongoose = require("mongoose")

const clipboardSchema = new mongoose.Schema(
	{
		clipId: {
			type: String,
			required: true,
			unique: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		clipString: {
			type: String,
			required: true,
		},
		clipPassword: {
			type: String,
			required: false,
		},
		clipOwner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: false,
		},
	},
	{
		versionKey: false,
	}
)

const Clipboard = mongoose.model("clips", clipboardSchema)

module.exports = Clipboard

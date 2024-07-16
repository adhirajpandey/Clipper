const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema(
  { 
    user: {
      type: String
    },
    razorpayId: {
      type: String
    },
    webhookPayload: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
);

const Payment = mongoose.model("payments", paymentSchema)

module.exports = Payment
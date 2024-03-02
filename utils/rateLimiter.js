const rateLimiter = require("express-rate-limit")

const {
	RATE_LIMITING_WINDOW_MIN,
	RATE_LIMITING_REQUESTS,
} = require("../configs")

const limiter = rateLimiter({
	windowMs: RATE_LIMITING_WINDOW_MIN * 60 * 1000,
	limit: RATE_LIMITING_REQUESTS,
})

module.exports = limiter

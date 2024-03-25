const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const jwt = require("jsonwebtoken")
const User = require("../models/user")

passport.serializeUser(function (user, cb) {
	cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
	cb(null, obj)
})

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		function (accessToken, refreshToken, profile, cb) {
			return cb(null, profile)
		}
	)
)

async function googleRedirect(req, res) {
	let user = {
		name: req.user.displayName,
		email: req.user._json.email,
		picture: req.user._json.picture,
		provider: req.user.provider,
	}

	const exisitingUser = await User.findOne({ email: user.email })

	let userPayload

	if (!exisitingUser) {
		const newUserItem = new User({
			name: user.name,
			email: user.email,
			password: null,
		})
		const response = await newUserItem.save()
		userPayload = { id: response._id, email: user.email }
	} else {
		userPayload = { id: exisitingUser._id, email: user.email }
	}

	let token = jwt.sign(userPayload, process.env.SECRET_KEY)
	res.cookie("clipper-token", token)
	res.redirect("/premium")
}

const googleLogin = passport.authenticate("google", {
	scope: ["profile", "email"],
})
const googlePassportAuth = passport.authenticate("google")

module.exports = {
	googleLogin,
	googleRedirect,
	googlePassportAuth,
}

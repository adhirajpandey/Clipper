const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const jwt = require("jsonwebtoken")

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
			//console.log(accessToken, refreshToken, profile)
			console.log("Google Oauth Validation Called")
			return cb(null, profile)
		}
	)
)

function googleRedirect(req, res) {
	let user = {
		name: req.user.displayName,
		email: req.user._json.email,
		picture: req.user._json.picture,
		provider: req.user.provider,
	}
	// console.log(user)

	let token = jwt.sign({ email: user.email }, process.env.SECRET_KEY)
	res.cookie("token", token)
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

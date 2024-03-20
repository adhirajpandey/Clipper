const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

async function createUser(req, resp) {
	try {
		const name = req.body.name
		const email = req.body.email
		const password = req.body.password

		const hashedPassword = await bcrypt.hash(password, 10)

		const newUserItem = new User({
			name: name,
			email: email,
			password: hashedPassword,
		})

		const response = await newUserItem.save()

		resp.json({
			message: "User Created",
		})
	} catch (error) {
		console.error("Error creating user item:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

async function loginUser(req, resp) {
	try {
		const email = req.body.email
		const password = req.body.password

		const user = await User.findOne({ email })

		if (!user) {
			resp.status(400).json({ error: "User does not exists" })
		} else {
			const passwordMatch = await bcrypt.compare(password, user.password)
			if (!passwordMatch) {
				resp.status(400).json({ error: "Invalid email or password" })
			} else {
				const userPayload = { id: user._id, email: user.email }
				const token = jwt.sign(userPayload, process.env.SECRET_KEY)
				resp.json({ token })
			}
		}
	} catch (error) {
		console.error("Error fetching user item:", error)
		resp.status(500).json({ error: "Internal Server Error" })
	}
}

module.exports = {
	createUser,
	loginUser,
}

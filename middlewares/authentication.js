const jwt = require('jsonwebtoken')


function authenticate(req, resp, next) {
    try {
        const authHeaderValue = req.headers.authorization
        const token = authHeaderValue.split("Bearer ")[1]
        if(!token) {
            resp.status(400).json({"message": "Invalid Token"})
        } else {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.headers.userId = decoded.id
            req.headers.email = decoded.email
        }
        next()   
    } catch(error) {
        console.log("Error in Authenticating", error)
        resp.status(401).json({"message": "Unauthorized User"})
    }

}

module.exports = authenticate
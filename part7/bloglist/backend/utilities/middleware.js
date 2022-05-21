const jwt = require("jsonwebtoken")
const User = require("../models/user")

const tokenExtractor = (req, res, next) => {
    // tokenin ekstraktoiva koodi
    const auth = req.get("authorization")

    if (auth && auth.toLowerCase().startsWith("bearer")) {
        req.token = auth.substring(7)
    }

    next()
}

const userExtractor = async (req,res,next) => {
    if (req.token) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        req.user = user
    }
    next()
}

module.exports = {
    tokenExtractor,
    userExtractor
}
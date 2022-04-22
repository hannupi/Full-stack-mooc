const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post("/", async (req,res) => {
    const {username, password} = req.body

    const user = await User.findOne({username})
    const correctPass = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && correctPass)) {
        return res.status(401).send("Invalid!")
    }

    const userToken = {
        username: user.username,
        id: user._id,
    }    

    const token = jwt.sign(userToken, process.env.SECRET)

    res.status(200)
        .send({
            token,
            username: user.username,
            name: user.name,
        })
})

module.exports = loginRouter
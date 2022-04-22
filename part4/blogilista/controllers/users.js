const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const user = await User.find({})
    if (user) {
        res.json(user)
    }
    else {
        res.status(404).end()
    }

})

usersRouter.post("/", async (req,res) => {
    const {username, name, password} = req.body

    // Salt pitää määritellä erikseen hashia varten
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const alreadyExistingUser = await User.findOne({username})
    if (alreadyExistingUser) {
        return res.status(400).send("Username not unique")
    }
    else if (password.length <= 3) {
        return res.status(400).send("Password must be at least 3 letters")
    }
    else {
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    }
})

module.exports = usersRouter
const config = require("./utilities/config")
const { info, error } = require("./utilities/logger")
const router = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require("./utilities/middleware")

const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")



info("connecting to", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log("Connected!")
    })
    .catch(error => {
        console.log("Failed to connect: ", error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)

app.use("/api/blogs", router)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

module.exports = app

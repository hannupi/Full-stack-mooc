const config = require("./utilities/config")
const { info, error } = require("./utilities/logger")
const router = require("./controllers/blogs")
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

app.use("/api/blogs", router)

module.exports = app

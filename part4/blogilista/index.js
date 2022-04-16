const app = require("./app")
const http = require('http')
const config = require("./utilities/config")
const { info, error } = require("./utilities/logger")


const server = http.createServer(app)

server.listen(config.PORT, () => {
    info(`http://localhost:${config.PORT}/api/blogs`)
})
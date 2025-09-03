const express = require("express")
const http = require("http")
const cors = require("cors")
const router = require("./routers/poojarouter")

const app = express()

app.use(express.json())

app.use(cors())

app.use(router)

const server = http.createServer(app)

module.exports = server;
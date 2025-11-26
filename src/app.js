const express = require("express")
const http = require("http")
const cors = require("cors")
const poojaRouter = require("./routers/poojarouter")
const productRouter = require("./routers/productRoutes")
const app = express()
const path = require("path")


app.use(express.json())

app.use(cors())

app.use("/api/pooja",poojaRouter)
app.use("/api/product",productRouter)

app.use("/uploads",express.static(path.join(__dirname, "uploads")))

const server = http.createServer(app)

module.exports = server;
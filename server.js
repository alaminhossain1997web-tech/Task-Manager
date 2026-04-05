const express = require("express");
const router = require("./routes");
const { config } = require("dotenv");
const dbConfig = require("./configs/dbConfig");
const app = express()

require("dotenv").config()
const dns = require("dns")
dns.setServers(['4.4.4.4','4.4.4.4'])

app.use(express.json())
app.use(router)

dbConfig()

app.listen(3000,()=> console.log("server Connected"));
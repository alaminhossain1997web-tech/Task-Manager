const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
require("dotenv").config();

const cookieParser = require("cookie-parser");

// for DNS server problem
// const dns = require("dns");
// dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(router);

dbConfig();

app.listen(8000, () => console.log("Server is running..."));
const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
const dns = require("dns");

require("dotenv").config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();

app.use(express.json());
app.use(router);

dbConfig();

app.listen(3000, "0.0.0.0", () => {
  console.log("Server connected");
});
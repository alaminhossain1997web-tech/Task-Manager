const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
const cookieParser = require('cookie-parser')

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);

dbConfig();

app.listen(8000, () => {
  console.log("Server connected");
});
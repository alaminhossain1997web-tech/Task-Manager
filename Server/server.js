require("dotenv").config();

const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");

const cookieParser = require("cookie-parser");
const cors = require("cors");

// for DNS server problem
 const dns = require("dns");
 dns.setServers(['8.8.8.8', '8.8.4.4']);
 
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

dbConfig();

app.listen(8000, () => console.log("Server is running..."));

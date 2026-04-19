const express = require("express");
const router = require("./routes");
const dbConfig = require("./configs/dbConfig");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await dbConfig();

    app.listen(PORT, () => {
      console.log(`Server connected on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

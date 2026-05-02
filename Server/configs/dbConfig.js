const mongoose = require("mongoose");

const dbConfig = async () => {
  const dbUrl = process.env.DB_URL;

  if (!dbUrl) {
    throw new Error("Missing DB_URL in your .env file.");
  }

  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected");
  } catch (error) {
    if (error?.code === "ECONNREFUSED" && error?.syscall === "querySrv") {
      console.error(
        "MongoDB SRV lookup failed. Your current DNS/network is refusing Atlas SRV queries."
      );
      console.error(
        "Use a standard mongodb:// connection string from MongoDB Atlas or switch to a DNS service that allows SRV lookups."
      );
    }

    throw error;
  }
};

module.exports = dbConfig;
 

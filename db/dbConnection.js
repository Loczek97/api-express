const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnection() {
  try {
    mongoose.connect(process.env.DB_URL).then(() => {
      console.log("Database connection successful");
    });
  } catch {
    console.log("Error while connecting to the database");
    console.log(process.env.DB_URL);
    process.exit(1);
  }
}

module.exports = dbConnection;

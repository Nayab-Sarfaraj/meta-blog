const mongoose = require("mongoose");
const { logger } = require("../utils/logger");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.z75tj.mongodb.net/test`;

let isConnected = false;

const connectToDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    logger.info("successfully connected to the database");
  } catch (err) {
    isConnected = false;
    logger.error("error while connecting with the database");
    logger.error(err);
    throw err;
  }
};

module.exports = connectToDb;

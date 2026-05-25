const mongoose = require("mongoose");
const { logger } = require("../utils/logger");
const env = require("../utils/env")();

const uri = `mongodb+srv://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@cluster0.z75tj.mongodb.net/test`;

let isConnected = false;

const connectToDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    logger.info("successfully connected to the database");
  } catch (err) {
    isConnected = false;
    logger.error({ err }, "error while connecting with the database");
    throw err;
  }
};

module.exports = connectToDb;

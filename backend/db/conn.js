const mongoose = require("mongoose");

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.z75tj.mongodb.net/test`;

let isConnected = false;

const connectToDb = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("successfully connected to the database");
  } catch (err) {
    isConnected = false;
    console.log("error while connecting with the database");
    console.log(err);
    throw err;
  }
};

module.exports = connectToDb;

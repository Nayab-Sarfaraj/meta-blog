const { MongoClient, ServerApiVersion } = require("mongodb");
const { default: mongoose } = require("mongoose");
// const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.z75tj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.z75tj.mongodb.net/test`;

const connectToDb = async () => {
  try {
    await mongoose.connect(uri);
    console.log("successfully connected to the database");
  } catch (err) {
    console.log("error while connecting with the database");
    console.log(err);
  } finally {
    console.log("can send the request now");
  }
};
module.exports = connectToDb;

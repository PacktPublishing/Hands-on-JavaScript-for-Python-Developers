require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true });

let database;

const connectDB = async () => {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db("starships");
  } catch (err) {
    console.error(err);
  }

  return database;
}

const getDB = () => database

const disconnectDB = () => client.close()

module.exports = { connectDB, getDB, disconnectDB }
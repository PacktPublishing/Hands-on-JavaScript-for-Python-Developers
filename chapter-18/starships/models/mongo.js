const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true });

let db;

const connectDB = async (test = '') => {
  if (db) {
    return db;
  }

  try {
    await client.connect();
    db = client.db(`starships${test}`);
  } catch (err) {
    console.error(err);
  }

  return db;
}

const getDB = () => db

const disconnectDB = () => client.close()

module.exports = { connectDB, getDB, disconnectDB }
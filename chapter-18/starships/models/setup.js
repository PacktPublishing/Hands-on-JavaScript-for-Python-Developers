require('dotenv').config()
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
// // const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
// const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
// // console.log(uri)

let connection, db

const setup = async () => {
  console.log(process.env.MONGO_URL)
  connection = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  db = await connection.db();
}




const insertRandomNames = async () => {
  await setup()

  const names = JSON.parse(fs.readFileSync(`${__dirname}/../data/starship-names.json`)).names

  db.collection("names").updateOne({ key: "names" }, { $set: { names: names } }, { upsert: true }, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
    return
  })
}

module.exports = insertRandomNames

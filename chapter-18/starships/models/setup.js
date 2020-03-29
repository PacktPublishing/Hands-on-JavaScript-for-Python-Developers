require('dotenv').config()
const fs = require('fs')
const MongoDB = require('./mongo')
// // const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
// const client = new MongoClient(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
// // console.log(uri)

let db

const setup = async () => {
  db = await MongoDB.connectDB()
}

const insertRandomNames = async () => {
  await setup()

  const names = JSON.parse(fs.readFileSync(`${__dirname}/../data/starship-names.json`)).names

  db.collection("names").updateOne({ key: "names" }, { $set: { names: names } }, { upsert: true }, (err, res) => {
    if (err) {
      console.error(err)
      return 0
    }
    return res
  })
}

module.exports = insertRandomNames

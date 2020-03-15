require('dotenv').config()
const fs = require('fs')

const MongoClient = require('mongodb').MongoClient
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true })


const insertRandomNames = () => {
  const names = JSON.parse(fs.readFileSync(`${__dirname}/../data/starship-names.json`)).names

  client.connect(err => {
    const collection = client.db("starships").collection("names")
    collection.updateOne({ key: "names" }, { $set: { names: names } }, { upsert: true }, (err, res) => {
      if (err) {
        console.error(err)
        return
      }
    })
  })
}

insertRandomNames()

const fs = require('fs')
const MongoDB = require('./mongo')

let db

const setup = async () => {
  db = await MongoDB.connectDB()
}

const insertRandomNames = async () => {
  await setup()

  const names = JSON.parse(fs.readFileSync(`${__dirname}/../data/starship-names.json`)).names

  const result = await db.collection("names").updateOne({ key: "names" }, { $set: { names: names } }, { upsert: true })

  return result
}

module.exports = insertRandomNames

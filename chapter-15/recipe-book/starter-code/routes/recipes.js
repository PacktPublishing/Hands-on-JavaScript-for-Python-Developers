var express = require('express');
var router = express.Router();

const fs = require('fs')

const readData = () => {
  if (!fs.existsSync(__dirname + "/../data/recipes.json")) {
    fs.writeFileSync(__dirname + "/../data/recipes.json", '[]')
  }

  return JSON.parse(fs.readFileSync(__dirname + "/../data/recipes.json"))
}

router.get('/', (req, res, next) => {
  const recipes = readData()
  res.json(recipes)
})

router.post('/', (req, res) => {
  console.log('something')
  let recipes = readData()
  console.log(recipes)
  const data = req.body
  console.log('data',data)
  recipes.push(data)
  fs.writeFileSync(__dirname + "/../data/recipes.json", JSON.stringify(recipes))
  res.json(recipes)
})

module.exports = router;
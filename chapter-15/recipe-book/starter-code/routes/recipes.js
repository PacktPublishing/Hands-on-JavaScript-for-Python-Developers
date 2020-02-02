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
  let recipes = JSON.parse(readData())
  const data = req.body
  recipes.push(data)
  fs.writeFileSync(__dirname + "/../data/recipes.json", JSON.stringify(recipes))
  res.json(recipes)
})

module.exports = router;
const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const fs = require('fs')


router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.get('/article', (req, res) => {
  res.send({ story: "An article from the database" })
})

router.post('/article/edit', (req, res) => {
  res.json({ article: req.body.article })
})

router.post('/media/upload', (req, res) => {
  res.sendStatus(200)
})

router.get('/media', (req, res) => {
  res.send({ media: "A list of media" })
})

router.post('/login', (req, res) => {
  res.sendStatus(200)
})

router.get('/countries', (req, res) => {
  res.send({ countries: "A list of countries" })
})

module.exports = router

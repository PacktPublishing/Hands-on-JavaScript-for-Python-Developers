var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const ShipsController = require('../controllers/ships');

router.post('/', upload.none(), async (req, res, next) => {
  await ShipsController.createShip(req.body);
  res.sendStatus(200);
});

router.post('/random', async (req, res, next) => {
  await ShipsController.createRandom();
  res.sendStatus(200);
});

module.exports = router;

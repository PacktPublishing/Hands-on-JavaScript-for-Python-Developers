var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const ShipsController = require('../controllers/ships');


router.get('/:ship1/attack/:ship2', async (req, res, next) => {
  const damage = await ShipsController.fire(req.params.ship1, req.params.ship2);
  res.sendStatus(200);
});

router.post('/', async (req, res, next) => {
  await ShipsController.createShip(req.body);
  res.sendStatus(200);
});

router.post('/random', async (req, res, next) => {
  res.json(await ShipsController.createRandom());
});

router.delete('/:ship', async (req, res, next) => {
  await ShipsController.scuttle(req.params.ship);
  res.sendStatus(200);
});

module.exports = router;

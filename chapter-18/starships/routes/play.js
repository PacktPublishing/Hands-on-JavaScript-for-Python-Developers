const express = require('express');
const router = express.Router();
const ShipsController = require('../controllers/ships');

router.get('/', async (req, res, next) => {
  res.render('play', { fleet: await ShipsController.getFleet(), enemyFleet: await ShipsController.getFleet(true) });
});

router.get('/fire', async (req, res, next) => {
  res.json(await ShipsController.fire(req.query.attacker, req.query.target, req.query.weapon));
});

module.exports = router;

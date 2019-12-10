const ShipsModel = require('../models/ships');

const TORPEDO_DAMAGE = 125;

const calculateDamge = (ship1, ship2, weapon) => {
  const distanceBetweenShips =  Math.sqrt(Math.pow(ship2.x - ship1.x, 2) + Math.pow(ship2.y - ship1.y, 2) + Math.pow(ship2.z - ship1.z, 2));
  const chanceToStrike = Math.floor(100-distanceBetweenShips);
  const didStrike = (Math.ceil(Math.random()*100) - chanceToStrike) ? true : false;
  const damage = (didStrike) ? ((weapon == 'phasers') ? Math.ceil(Math.random()*ship1.phasers) : TORPEDO_DAMAGE) : 0;
  return damage;
}

exports.createShip = async (data) => {
  return await ShipsModel.createShip(data);
}

exports.getFleet = async(data) => {
  return await ShipsModel.getFleet();
}

exports.createRandom = async () => {
  return await ShipsModel.createRandom();
}

exports.scuttle = async (ship) => {
  return await ShipsModel.scuttle(ship);
}

exports.fire = async (ship1, ship2, weapon) => {
  const target = await ShipsModel.getShip(ship2);
  const source = await ShipsModel.getShip(ship1);
  let damage = calculateDamage(source, target, weapon);

  if (weapon == 'torpedo' && source.torpedoes > 0) {
    ShipsModel.fireTorpedo(ship1);
  } else {
    damage = 0
  }

  return damage;
}
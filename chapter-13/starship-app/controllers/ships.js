const ShipsModel = require('../models/ships');

const DECAY = 0.15;

const calculateDamge = (ship1, ship2) => {
   return Math.floor(Math.pow((Math.ceil(ship1.phasers) * Math.random()) * 1 - DECAY), Math.pow(ship2.x - ship1.x, 2) + Math.pow(ship2.y - ship1.y, 2) + Math.pow(ship2.z - ship1.z, 2));
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

exports.fire = async (ship1, ship2) => {
  const target = await ShipsModel.getShip(ship2);
  const source = await ShipsModel.getShip(ship1);
  return calculateDamge(source, target);
}
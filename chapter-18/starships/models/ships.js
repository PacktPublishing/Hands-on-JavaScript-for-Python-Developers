const fs = require('fs')
const MongoDB = require('./mongo')

let db

const setup = async () => {
  db = await MongoDB.connectDB()
}

const eliminateExistingShips = async () => {
  await setup()

  const fleet = await db.collection("fleet").find().toArray();

  const fleetNames = [];

  fleet.forEach(ship => {
    fleetNames.push(ship.name)
  })

  const names = await db.collection("names").find().toArray();

  const availableNames = names[0].names.filter((name) => {
    return fleetNames.indexOf(name)
  })

  const unavailableRegistryNumbers = Object.values(fleet).map((value, index, arr) => {
    return value.registry;
  });

  return { names: availableNames, unavailableRegistries: unavailableRegistryNumbers };
}

exports.createShip = async (data) => {
  data = {
    shields: 100,
    hull: 0,
    x: 0,
    y: 0,
    z: 0,
    ...data,
  }


  const fleet = await eliminateExistingShips()

  data.registry = `NCC-${Math.round(Math.random() * 10000)}`

  while (fleet.unavailableRegistries.includes(data.registry)) {
    data.registry = `NCC-${Math.round(Math.random() * 10000)}`
  }

  await db.collection('fleet').insertOne(data)
  return data.registry
}

exports.getFleet = async (enemy) => {
  await setup()

  const fleet = await db.collection((!enemy) ? "fleet" : "enemy").find().toArray();
  return fleet.sort((a, b) => (a.name > b.name) ? 1 : -1)
}

exports.createRandom = async (enemy = false) => {
  const { names, unavailableRegistries } = await eliminateExistingShips();

  const randomSeed = Math.ceil(Math.random() * names.length);

  const shipData = {
    name: (!enemy) ? names[randomSeed] : "Borg Cube",
    registry: (!enemy) ? `NCC-${Math.round(Math.random() * 10000)}` : `Cube-${Math.round(Math.random() * 10000)}`,
    shields: 100,
    torpedoes: (!enemy) ? Math.round(Math.random() * 255 + 1) : 0,
    hull: 0,
    speed: (Math.random() * 9 + 1).toPrecision(2),
    phasers: Math.round(Math.random() * 100 + 1),
    x: Math.round(Math.random() * 100),
    y: Math.round(Math.random() * 100),
    z: Math.round(Math.random() * 100)
  };

  // @TODO include cubes in number removal
  while (unavailableRegistries.includes(shipData.registry)) {
    shipData.registry = `NCC-${Math.round(Math.random() * 10000)}`;
  }

  const collection = await db.collection((!enemy) ? "fleet" : "enemy").insertOne(shipData)

  return shipData.registry
}

exports.scuttle = async (ship) => {
  await db.collection("fleet").deleteOne({ registry: ship }, 1);
  return;
}

exports.getShip = async (ship) => {
  const enemy = (!ship.indexOf('NCC')) ? "fleet" : "enemy"

  return await db.collection(enemy).findOne({ registry: ship });
}

exports.fireTorpedo = async (ship) => {
  const foundship = await this.getShip(ship)
  foundship.torpedoes -= 1;

  return await db.collection("fleet").updateOne({ registry: ship}, { $set: { torpedoes: foundship.torpedoes } });
}

exports.registerDamage = async (ship, damage) => {
  const enemy = (!ship.registry.indexOf('NCC')) ? "fleet" : "enemy"
  
  const target = await db.collection(enemy).findOne({ registry: ship.registry })

  if (target.shields > damage) {
    target.shields -= damage
  } else {
    target.shields -= damage
    target.hull += Math.abs(target.shields)
    target.shields = 0
  }

  await db.collection(enemy).updateOne({ registry: ship.registry }, { $set: { shields: target.shields, hull: target.hull } });
  if (target.hull >= 100) {
    await this.scuttle(target.registry);
    return 0;
  }

  return { shields: target.shields, hull: target.hull };
}
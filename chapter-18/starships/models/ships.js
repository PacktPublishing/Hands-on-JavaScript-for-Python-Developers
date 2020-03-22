require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database;

const loadDB = async () => {
  if (database) {
    return database;
  }

  try {
    await client.connect();
    database = client.db("starships");
  } catch (err) {
    console.error(err);
  }

  return database;
}

loadDB();

const eliminateExistingShips = async () => {
  const fleet = await database.collection("fleet").find().toArray();

  const fleetNames = [];

  fleet.forEach(ship => {
    fleetNames.push(ship.name)
  })

  const names = await database.collection("names").find().toArray();

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
    ...data,
    shields: 100,
    hull: 0,
    x: 0,
    y: 0,
    z: 0
  }

  const fleet = await eliminateExistingShips()

  data.registry = `NCC-${Math.round(Math.random() * 10000)}`

  while (fleet.unavailableRegistries.inArray(data.registry)) {
    data.registry = `NCC-${Math.round(Math.random() * 10000)}`
  }

  await database.collection('fleet').insertOne(data, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
  });
  return;
}

exports.getFleet = async (enemy) => {
  const fleet = await database.collection((!enemy) ? "fleet" : "enemy").find().toArray();
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

  database.collection((!enemy) ? "fleet" : "enemy").insertOne(shipData, (err, res) => {
    if (err) {
      console.error(err)
      return
    }
  })

  return;
}

exports.scuttle = async (ship) => {
  await database.collection("fleet").deleteOne({ registry: ship }, 1);
  return;
}

exports.getShip = async (ship) => {
  const enemy = (!ship.indexOf('NCC')) ? "fleet" : "enemy"

  return await database.collection(enemy).findOne({ registry: ship });
}

exports.fireTorpedo = async (ship) => {
  return await database.collection("fleet").updateOne({ registry: ship}, { $set: { torpedoes: torpedoes-- } });
}

exports.registerDamage = async (ship, damage) => {
  const enemy = (!ship.registry.indexOf('NCC')) ? "fleet" : "enemy"
  
  const target = await database.collection(enemy).findOne({ registry: ship.registry })

  if (target.shields) {
    target.shields -= damage;
    if (target.shields < 0) {
      target.hull -= Math.abs(target.shields);
      target.shields = 0;
    }
  }

  await database.collection(enemy).updateOne({ registry: ship }, { $set: { shields: target.shields, hull: target.hull } });

  if (target.hull <= 0) {
    this.scuttle(ship);
    return 0;
  }

  return { shields: target.shields, hull: target.hull };
}
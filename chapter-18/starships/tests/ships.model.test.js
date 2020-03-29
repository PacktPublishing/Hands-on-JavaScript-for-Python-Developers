const MongoDB = require('../models/mongo')
const insertRandomNames = require('../models/setup')

const { getFleet, createRandom, scuttle, getShip, createShip, fireTorpedo, registerDamage } = require('../models/ships')

describe('fleet', () => {
  let db
  let seleya

  beforeAll(async () => {
    db = await MongoDB.connectDB('test')
    await db.collection('fleet').deleteMany({})
    await insertRandomNames()
  });

  afterAll(async (done) => {
    await MongoDB.disconnectDB();
    done()
  });

  beforeEach(async () => {
    // await db.collection('test').deleteMany({});
  });

  it('should return an empty fleet', async() => {
    const fleet = await getFleet()

    expect(fleet.length).toEqual(0)
  })

  it('should insert one ship', async() => {
    await createRandom();
    const fleet = await getFleet()

    expect(fleet.length).toEqual(1)
  })

  it('should insert, find, and scuttle one ship', async() => {
    const random = await createRandom();
    let fleet = await getFleet()
    expect(fleet.length).toEqual(2)

    const ship = await getShip(random)
    expect(ship.registry).toEqual(random)

    await scuttle(random)
    fleet = await getFleet()

    expect(fleet.length).toEqual(1)
  })

  it('should create and find one ship', async() => {
    const data = {
      name: "Seleya",
      speed: "9.5",
      phasers: 100,
      torpedoes: 10
    }

    seleya = await createShip(data)
    const returnedShip = await getShip(seleya)

    expect(returnedShip.name).toEqual("Seleya")
  })

  it('should fire one torpedo from the Seleya', async() => {
    seleya = await getShip(seleya)
    await fireTorpedo(seleya.registry)

    seleya = await getShip(seleya.registry)
    expect(seleya.torpedoes).toEqual(9)
  })

  it('should register shield damage on the Seleya', async() => {
    let returnedShip = await getShip(seleya.registry)
    await registerDamage(returnedShip, 50)

    returnedShip = await getShip(seleya.registry)

    expect(returnedShip.shields).toEqual(50)
  })

  it('should register shield and hull damage on the Seleya', async() => {
    let returnedShip = await getShip(seleya.registry)
    await registerDamage(returnedShip, 100)

    returnedShip = await getShip(seleya.registry)

    expect(returnedShip.shields).toEqual(0)
    expect(returnedShip.hull).toEqual(50)
  })

  it('should register hull damage on the Seleya and scuttle her', async() => {
    let returnedShip = await getShip(seleya.registry)
    await registerDamage(returnedShip, 100)

    returnedShip = await getShip(seleya.registry)

    expect(returnedShip).toEqual(null)
  })

});
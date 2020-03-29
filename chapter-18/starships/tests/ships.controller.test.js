const MongoDB = require('../models/mongo')
const { getFleet, createRandom, createShip, scuttle, fire, createFleet } = require('../controllers/ships')
const { getShip, } = require('../models/ships')
const insertRandomNames = require('../models/setup')


describe('fleet controller operations', () => {
  let db
  let seleya

  beforeAll(async () => {
    db = await MongoDB.connectDB('test')
    await db.collection('fleet').deleteMany({})
    await db.collection('enemy').deleteMany({})
    await insertRandomNames()

  })

  afterAll(async (done) => {
    await db.collection('fleet').deleteMany({})
    await db.collection('enemy').deleteMany({})
    await MongoDB.disconnectDB();
    done()
  })

  it('should get the empty fleet', async () => {
    const fleet = await getFleet()
    expect(fleet.length).toEqual(0)
  })

  it('should create one random ship', async () => {
    let fleet = await getFleet()
    expect(fleet.length).toEqual(0)

    await createRandom()

    fleet = await getFleet()
    expect(fleet.length).toEqual(1)
  })

  it('should create the Seleya', async() => {
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

  it('should scuttle the Seleya', async() => {
    scuttle(seleya)
    const returnedShip = await getShip(seleya)

    expect(returnedShip).toEqual(null)
  })

  it('should create two specific ships and fire at one', async () => {
    let data = {
      speed: "9.5",
      phasers: 100,
      torpedoes: 10,
      x: 0,
      y: 0,
      z: 0
    }

    data.name = 'enterprise'

    const enterprise = await createShip(data)

    let borg = await createRandom(true)
    borg = await getShip(borg)
        
    const damage = await fire(enterprise, borg.registry, 'phasers')

    expect(damage).toBeTruthy()
    attackedBorg = await getShip(borg.registry)

    expect(attackedBorg.shields).toBeLessThan(borg.shields)    
  })

  it('should create two fleets', async () => {
    await db.collection('fleet').deleteMany({})
    await db.collection('enemy').deleteMany({})

    let count = Math.floor(Math.random() * 100)

    for (i = count; i > 0; i--) {
      await createRandom()
    }

    let fleet = await getFleet()

    await createFleet()

    let enemies = await getFleet(true)

    expect(fleet.length).toEqual(enemies.length)
  })
})

const ShipsModel = require('../models/ships')

const TORPEDO_DAMAGE = 125

const calculateDamage = (ship1, ship2, weapon) => {
  const distanceBetweenShips =  Math.sqrt(Math.pow(ship2.x - ship1.x, 2) + Math.pow(ship2.y - ship1.y, 2) + Math.pow(ship2.z - ship1.z, 2))
  const chanceToStrike = Math.floor(100-distanceBetweenShips)
  const didStrike = (Math.ceil(Math.random()*100) - chanceToStrike) ? true : false
  const damage = (didStrike) ? ((weapon == 'phasers') ? Math.ceil(Math.random()*ship1.phasers) : TORPEDO_DAMAGE) : 0
  return damage
}

exports.createShip = async (data) => {
  return await ShipsModel.createShip(data)
}

exports.getFleet = async (enemy = false) => {
  return await ShipsModel.getFleet(enemy)
}

exports.createRandom = async (enemy = false) => {
  return await ShipsModel.createRandom(enemy)
}

exports.scuttle = async (ship) => {
  return await ShipsModel.scuttle(ship)
}

exports.fire = async (ship1, ship2, weapon) => {
  let target = await ShipsModel.getShip(ship2)
  const source = await ShipsModel.getShip(ship1)
  let damage = calculateDamage(source, target, weapon)
  
  target = await ShipsModel.registerDamage(target, damage)

  return { target: target, fleet: await this.getFleet(false), enemyFleet: await this.getFleet(true) }
}

exports.createFleet = async () => {
  const playerFleet = await this.getFleet()
  const enemyFleet = await this.getFleet(true)

  if (enemyFleet.length <= 0) {
    for (let i = 0; i < playerFleet.length; i++) {
      await this.createRandom(true)
    }
    return enemyFleet
  } else {
    return enemyFleet
  }
}

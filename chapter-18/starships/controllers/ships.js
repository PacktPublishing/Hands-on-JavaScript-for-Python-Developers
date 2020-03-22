const ShipsModel = require('../models/ships')

const TORPEDO_DAMAGE = 125

const calculateDamage = (ship1, ship2, weapon) => {
  console.log(ship2)
  const distanceBetweenShips =  Math.sqrt(Math.pow(ship2.x - ship1.x, 2) + Math.pow(ship2.y - ship1.y, 2) + Math.pow(ship2.z - ship1.z, 2))
  const chanceToStrike = Math.floor(100-distanceBetweenShips)
  const didStrike = (Math.ceil(Math.random()*100) - chanceToStrike) ? true : false
  const damage = (didStrike) ? ((weapon == 'phasers') ? Math.ceil(Math.random()*ship1.phasers) : TORPEDO_DAMAGE) : 0
  return damage
}

exports.createShip = async (data) => {
  return await ShipsModel.createShip(data)
}

exports.getFleet = async (fleet = false) => {
  return await ShipsModel.getFleet(fleet)
}

exports.createRandom = async (enemy = false) => {
  return await ShipsModel.createRandom(enemy)
}

exports.scuttle = async (ship) => {
  return await ShipsModel.scuttle(ship)
}

exports.fire = async (ship1, ship2, weapon) => {
  const target = await ShipsModel.getShip(ship2)
  const source = await ShipsModel.getShip(ship1)
  let damage = calculateDamage(source, target, weapon)

  if (weapon === 'torpedo' && source.torpedoes > 0) {
    ShipsModel.fireTorpedo(ship1)
  } else if (source.torpedoes <= 0) {
    damage = 0
  }
  
  await ShipsModel.registerDamage(target, damage)

  return damage
}

exports.createFleet = async () => {
  const playerFleet = await this.getFleet()
  const enemyFleet = await this.getFleet(true)

  if (enemyFleet.length <= 0) {
    for (let i = 0; i < playerFleet.length; i++) {
      this.createRandom(true)
    }
    return await this.getFleet(true)
  } else {
    console.log(1)
    return enemyFleet
  }
}

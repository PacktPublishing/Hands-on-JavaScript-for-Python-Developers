const axios = require('axios')
const inquirer = require('inquirer')
const asciify = require('asciify-image')
const blessed = require('blessed');

const pokes = {}

// Create a screen object.
const screen = blessed.screen({
  smartCSR: true
})

// Create a box perfectly centered horizontally and vertically.
const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '75%',
  height: '75%',
  tags: true,
  shrink: 'grow',
  style: {
    fg: 'white',
  }
})


// Append our box to the screen.
screen.append(box)

const splashscreen = blessed.ANSIImage({
  file: __dirname + '/img/pokeapi_256.png',
  parent: box,
  width: '100%',
  height: '100%'
})

screen.title = 'Pokéapi!'

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
})

screen.render()

async function start() {
  const pokemon = await getPokemon()
  /*  asciify(__dirname + '/img/pokeapi_256.png', { fit: 'box', width: 50 }, async (err, converted) => {
      console.log(err || converted)
  */
  box.destroy()

  const playArea = blessed.box({
    top: 'center',
    left: 'center',
    width: '75%',
    height: '75%',
    tags: true,
    style: {
      fg: 'white',
    }
  })

  // const pokeLabel = blessed.text({
  //   content: "Choose your Pokémon!",
  //   style: {
  //     fg: 'white'
  //   },
  //   parent: screen
  // })
  const pokelist = blessed.list({
    items: pokemon.map(mon => mon.name),
    parent: playArea,
    keys: true,
    style: {
      selected: {
        bg: 'blue',
        fg: 'white'
      },
      item: {
        bg: 'white',
        fg: 'blue'
      },
      focus: {
        bg: 'red'
      }
    },
    height: '75%',
    width: '50%',
  })
  // playArea.append(pokeLabel)
  screen.append(playArea)

  screen.render()
  /*    let question = {
        type: "list",
        name: "POKEMON",
        message: `Choose your Pokémon!`,
        choices: pokemon.map(mon => mon.name)
      }
  
      let { POKEMON } = await inquirer.prompt(question)
  
      pokes['player'] = pokemon.filter(obj => {
        return obj.name === POKEMON
      })[0]
  
      pokes['computer'] = pokemon[(Math.floor(Math.random() * pokemon.length))]
  
      console.log(`You have chosen ${POKEMON}! The computer's chosen ${pokes.computer.name}.`)
      console.log("Birthing your Pokémon... please wait...")
  
      await createPokemon('player')
      await createPokemon('computer')
  
      play()*/
  //})
}

async function play() {
  console.log(`Player's ${pokes['player'].name}!\n${pokes['player'].img}`)
}

async function getPokemon(person) {
  const pokes = await axios({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=1000'
  })

  return pokes.data.results
}

async function createImg(url) {
  return asciify(url, { fit: 'box', width: 25 })
    .then((ascii) => {
      return ascii
    }).catch((err) => {
      console.error(err);
    });
}

async function createPokemon(person) {
  let poke = pokes[person]

  const myPoke = await axios({
    url: poke.url,
    method: 'get'
  })

  poke = myPoke.data

  const moves = poke.moves.filter((move) => {
    const mymoves = move.version_group_details.filter((level) => {
      return level.level_learned_at === 1
    })
    return mymoves.length > 0
  })

  const move1 = await axios({
    url: moves[0].move.url
  })

  const move2 = await axios({
    url: moves[1].move.url
  })

  pokes[person] = {
    name: poke.name,
    hp: poke.stats[5].base_stat,
    img: await createImg(poke.sprites.front_default),
    moves: {
      [moves[0].move.name]: {
        name: moves[0].move.name,
        url: moves[0].move.url,
        power: move1.data.power
      },
      [moves[1].move.name]: {
        name: moves[1].move.name,
        url: moves[1].move.url,
        power: move2.data.power
      }
    }
  }
}

setTimeout(() => {
  start()
}, 2000)
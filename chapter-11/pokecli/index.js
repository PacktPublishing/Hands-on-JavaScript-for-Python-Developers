const axios = require('axios')
const asciify = require('asciify-image')
const term = require('terminal-kit').terminal

const pokes = {}

function terminate() {
  term.grabInput(false);
  setTimeout(function () { process.exit() }, 100);
}

term.on('key', (name, matches, data) => {
  if (name === 'CTRL_C') {
    terminate();
  }
})

term.grabInput({ mouse: 'button' });


term.drawImage(__dirname + '/img/pokeapi_256.png', {
  shrink: {
    width: term.width,
    height: term.height * 2
  }
})

async function start() {
  const pokemon = await getPokemon()

  term.bold.cyan('Choose your Pokémon!\n')

  term.gridMenu(pokemon.map(mon => mon.name), {}, async (error, response) => {
    pokes['player'] = pokemon[response.selectedIndex]
    pokes['computer'] = pokemon[(Math.floor(Math.random() * pokemon.length))]
    await createPokemon('player')
    await createPokemon('computer')
    term(`Your ${pokes['player'].name} is so cute!\n${pokes['player'].img}\n`)
    term.singleLineMenu( ['Continue'], (error, response) => {
      term(`\nWould you like to continue against the computer's scary ${pokes['computer'].name}? \n ${pokes['computer'].img}\n`)
      term.singleLineMenu( ['Yes', 'No'], (error, response) => {
        term(`${pokes['computer'].name} is already attacking! No time to decide!`)
      })
    })
  })
}

async function play() {
  

}

async function getPokemon() {
  const pokes = await axios({
    url: 'https://pokeapi.co/api/v2/pokemon?limit=50'
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

start()

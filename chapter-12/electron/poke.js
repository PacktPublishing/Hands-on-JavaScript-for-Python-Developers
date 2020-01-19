class Poke {
  constructor() {
    this.loader = document.querySelector('#loader')
    this.chosenPokemon = {}
    this.Player1 = {}
    this.Player2 = {}

    document.addEventListener('click', (e) => {
      if (e.target.className == 'go') {
        this.choosePokemon(e.target.parentNode.querySelector('.pokeSelector').value, e.target.parentNode)
      }
    })
  }

  getPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        const pokeSelector = document.querySelector('.pokeSelector.main')

        data.results.forEach((poke) => {
          const option = document.createElement('option')
          option.value = poke.url
          option.innerHTML = poke.name
          pokeSelector.appendChild(option)
        })

        const selector = pokeSelector.cloneNode(true)
        document.querySelector('.pokeSelector.clone').replaceWith(selector)

        this.toggleLoader()

        document.querySelector('#Player1').style.visibility = 'visible'
        document.querySelector('#Player2').style.visibility = 'visible'
      })
  }

  choosePokemon(url, parent) {
    this.toggleLoader()
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        this.toggleLoader()

        const moves = data.moves.filter((move) => {
          const mymoves = move.version_group_details.filter((level) => {
            return level.level_learned_at === 1
          })
          return mymoves.length > 0
        })

        this.chosenPokemon[parent.id] = data
        this.populateCard(data, parent, moves)
      })
  }

  populateCard(data, root, moves) {
    const card = root.querySelector('.card')
    card.querySelector('img').setAttribute('src', data.sprites.front_default)
    card.querySelector('h3').innerHTML = data.name

    document.addEventListener('hp', (e) => {
      if (e.detail.player === root.id) {
        card.querySelector('.hp').innerHTML = e.detail.hp
      }

    })

    card.querySelector('.move1').innerHTML = moves[0].move.name
    card.querySelector('.move2').innerHTML = moves[1].move.name

    card.querySelector('.move1').dataset.url = moves[0].move.url
    card.querySelector('.move2').dataset.url = moves[1].move.url

    card.addEventListener('click', (e) => {
      if (e.target.nodeName === 'BUTTON') {
        this.doMove(e.target.dataset.url, root.id)
      }
    })

    this.hp = {
      player: root.id,
      hp: data.stats[5].base_stat
    }

    card.style.visibility = 'visible'

  }

  set hp(event) {
    if (event.hp) {
      this[event.player].hp = event.hp
    }

    if (event.damage) {
      this[event.player].hp -= event.damage
    }
    const e = new CustomEvent("hp", {
      detail: {
        player: event.player,
        hp: this[event.player].hp
      }
    })
    document.dispatchEvent(e)
  }

  doMove(url, player) {
    const opponent = (player == 'Player1') ? 'Player2' : 'Player1'

    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        if (data.power) {
          const damage = Math.floor(Math.random() * data.power)
          this.hp = {
            player: opponent,
            damage: damage
          }
          if (this[opponent].hp <= 0) {
            this.declareWinner(opponent)
          } else {
            this.doResult("It's effective!", true)
          }
        } else {
          this.doResult("It's not very effective...", true)
        }
      })
  }

  declareWinner(player) {
    this.doResult(`${player}'s Pokémon has fainted!`)
  }

  doResult(data, fade = false) {
    const result = document.querySelector('#result')
    result.querySelector('h2').innerHTML = data
    result.style.visibility = 'visible'
    result.style.opacity = 1

    if (fade === true) {
      setTimeout(() => {
        let fadeEffect = setInterval(() => {
          if (!result.style.opacity) {
            result.style.opacity = 1;
          }
          if (result.style.opacity > 0) {
            result.style.opacity -= 0.1;
          } else {
            clearInterval(fadeEffect);

            result.style.visibility = 'hidden'
          }
        }, 100)
      }, 1000)
    }

  }

  toggleLoader() {
    if (this.loader.style.visibility === 'visible' || this.loader.style.visibility === '') {
      this.loader.style.visibility = 'hidden'
    } else {
      this.loader.style.visibility = 'visible'
    }
  }
}

const p = new Poke().getPokemon()

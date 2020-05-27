let name = '',
  planet = '',
  films = [],
  filmNames = ''
let hello = "Hello! My name is {name} and I'm from {planet}. I've been in {films} and I'm a Jedi."

fetch('https://swapi.dev/api/people/1/')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    name = json.name
    planet = json.homeworld
    films = json.films
    return json
  })
  .then((json) => {
    fetch(planet)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        planet = json.name
      })
      .then(() => {
        const filmPromise = new Promise((resolve, reject) => {
            let counter = 0
            for (let i = 0; i < films.length; i++) {
              fetch(films[i])
                .then((response) => {
                  return response.json()
                })
                .then((json) => {
                  filmNames += json.title + ', '
                  counter++
                  if (counter === films.length) {
                    resolve()
                  }
                })
            }

          })
          .then(() => {
            hello = hello.replace('{name}', name).replace('{planet}', planet).replace('{films}', filmNames)
            document.querySelector('#main').innerHTML = hello
          })
      })
  })

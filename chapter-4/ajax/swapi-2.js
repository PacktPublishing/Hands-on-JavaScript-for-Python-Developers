fetch('https://swapi.dev/api/people/1/')
  .then((response) => {
    return response.json()
  })
  .then((json) => {
    document.querySelector('#main').innerHTML = JSON.stringify(json)
  })
document.querySelector('#headline').innerHTML = "Luke Skywalker"

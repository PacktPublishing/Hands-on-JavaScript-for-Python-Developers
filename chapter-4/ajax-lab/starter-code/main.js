let name = '',
  planet = '',
  films = [],
  filmNames = ''
let hello = "Hello! My name is {name} and I'm from {planet}. I've been in {films} and I'm a Jedi."

fetch('https://swapi.dev/api/people/1/')
  // write your code here.
  .then((response) => {
    hello = hello.replace('{name}', name).replace('{planet}', planet).replace('{films}', filmNames)
    document.querySelector('#main').innerHTML = hello
  })

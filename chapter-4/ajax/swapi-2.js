fetch('https://swapi.co/api/people/1/')
	.then((response) => {
		return response.json()
	})
  .then((json) => {
  	document.querySelector('#main').innerHTML = JSON.stringify(json)
  })

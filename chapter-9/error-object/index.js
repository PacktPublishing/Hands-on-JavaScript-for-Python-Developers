const typoError = () => {
  cnosole.error('my fault')
}

const fetchAttempt = () => {
  fetch("https://swapi.dev/api/undefined")
    .then((response) => {
        try {
          return response.json()
        } catch (e) {
          return response.error()
        }
    }).then((data) => {
      console.log(data)
    }).catch((error) => {
        throw new Error(error)
    })
}


typoError()
fetchAttempt()

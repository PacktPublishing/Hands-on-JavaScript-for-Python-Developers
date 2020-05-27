const typoError = () => {
  try {
    cnosole.error('my fault')
  } catch(e) {
    console.error(e)
  }
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

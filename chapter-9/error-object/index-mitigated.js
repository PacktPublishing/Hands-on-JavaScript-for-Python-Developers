const typoError = () => {
  try {
    cnosole.error('my fault')
  } catch(e) {
    console.error(e)
  }
}

const fetchAttempt = () => {
  fetch("http://httpstat.us/500")
    .then((response) => {
        return response
    }).then((data) => {
      if (data.status === 500) {
        throw new Error(data)
      }
      console.log(data)
    }).catch((error) => {
        throw new Error(error)
    })
}


typoError()
fetchAttempt()

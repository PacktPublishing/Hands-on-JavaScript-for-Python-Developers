const fetchAttempt = (url) => {
  fetch(url)
    .then((response) => {
        return response
    }).then((data) => {
      if (data.status === 500) {
        console.log("We got a 500 error")
      }
      console.log(data)
    }).catch((error) => {
        throw new Error(error)
    })
}

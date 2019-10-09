const fetchAttempt = () => {
  fetch('http://nonexistent.com')
    .then((data) => {
      console.log('ok')
    }).catch((err) => {
      console.error(err)
    })
}

fetchAttempt()

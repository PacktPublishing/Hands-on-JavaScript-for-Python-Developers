document.querySelector('button').addEventListener('click', (e) => {
  document.querySelector('p').innerHTML = `Hello! It is currently ${new Date()}.`
})

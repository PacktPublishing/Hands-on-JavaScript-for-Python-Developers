const myEvent = new Event('details')

document.querySelector('button').addEventListener('click', (e) => {
  document.querySelector('.date').innerHTML = `Hello! It is currently ${new Date()}.`
  myEvent.details = e
  document.dispatchEvent(myEvent)
})

document.addEventListener('details', (e) => {
  document.querySelector('.details').innerHTML = `x: ${e.details.x} y: ${e.details.y}`
})

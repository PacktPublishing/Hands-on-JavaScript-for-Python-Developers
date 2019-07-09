const phases = {
  1: 'capture',
  2: 'target',
  3: 'bubble'
}

document.querySelector('button').addEventListener('mousemove', (e) => {
  document.querySelector('#x').value = e.x
  document.querySelector('#y').value = e.y
})

document.querySelector('.box').addEventListener('mousemove', (e) => {
  document.querySelector('#x-box').value = e.x
  document.querySelector('#y-box').value = e.y
})

document.querySelector('body').addEventListener('mousemove', (e) => {
  document.querySelector('#x-body').value = e.x
  document.querySelector('#y-body').value = e.y
})

document.querySelector('button').addEventListener('click', clickHandler)
document.querySelector('.box').addEventListener('click', clickHandler)
document.querySelector('html').addEventListener('click', clickHandler)

function clickHandler(e) {
  console.log(`clicked in phase ${phases[e.eventPhase]}`)

}

const phases = {
  1: 'capture',
  2: 'target',
  3: 'bubble'
};

function logClick(event) {
  let currentTarget = event.currentTarget.tagName;
  let phaseName = phases[event.eventPhase];
  let message = 'Click event triggered during ' + phaseName + ' phase at ' + currentTarget;
  message += ' And this event was previously handled at ' + event.previouslyHandledTagName;
  console.log(message)
  event.previouslyHandledTagName = currentTarget;
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


document.querySelector('html').addEventListener('click', logClick, true)
document.querySelector('body').addEventListener('click', logClick)
document.querySelector('button').addEventListener('click', logClick)

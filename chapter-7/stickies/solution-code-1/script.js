const container = document.querySelector('.container') // set .container to a variable so we don't need to find it every time we click
let noteCount = 1 // inital value
const messageBox = document.querySelector('#messageBox')

// access our button and assign a click handler
document.querySelector('.box-creator-button').addEventListener('click', () => {
  //  create our DOM element
  const stickyNote = document.createElement('div')

  // set our class name
  stickyNote.className = 'box'

  // get our other DOM elements
  const stickyMessage = document.querySelector('.box-color-note')
  const stickyColor = document.querySelector('.box-color-input')

  // get our variables
  const message = stickyMessage.value
  const color = stickyColor.style.backgroundColor

  // blank out the input fields
  stickyMessage.value = stickyColor.value = ''
  stickyColor.style.backgroundColor = '#fff'

  // define the attributes
  stickyNote.innerHTML = `${noteCount++}. ${message}`
  stickyNote.style.backgroundColor = color

  stickyNote.addEventListener('click', (e) => {
    document.querySelector('#color').innerHTML = e.target.style.backgroundColor
    document.querySelector('#message').innerHTML = e.target.innerHTML

    messageBox.style.visibility = 'visible'

    document.querySelector('#delete').addEventListener('click', (event) => {
      messageBox.style.visibility = 'hidden'
      e.target.remove()
    })
  })

  // add the sticky
  container.appendChild(stickyNote)
})

document.querySelector('#close').addEventListener('click', (e) => {
  messageBox.style.visibility = 'hidden'
})

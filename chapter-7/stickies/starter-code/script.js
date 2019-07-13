const container = document.querySelector('.container') // set .container to a variable so we don't need to find it every time we click
let noteCount = 1 // inital value

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

  // add the sticky
  container.appendChild(stickyNote)
})

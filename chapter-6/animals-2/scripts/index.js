const images = {
  'path': 'images/',
  'dog': 'dog.jpg',
  'cat': 'cat.jpg',
  'elephant': 'elephant.jpg',
  'horse': 'horse.jpg',
  'panda': 'panda.jpg',
  'rabbit': 'rabbit.jpg'
}

const buttons = document.querySelectorAll('.flex-item');

buttons.forEach((button) => {
  button.addEventListener('mouseover', (e) => {
    e.target.style.backgroundColor = 'turquoise'
  })
  button.addEventListener('click', (e) => {
    document.querySelector('img').src = `${images.path}${images[e.target.id]}`
  })
})

document.querySelector('#image').addEventListener('mouseover', (e) => {
  alert(`My favorite picture is ${e.target.src}`)
})

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
  button.addEventListener('click', (e) => {
    document.querySelector('img').src = `${images.path}${images[e.target.id]}`
  })
})

document.querySelector('#save').addEventListener('click', () => {
  fetch('/user', {
    method: 'POST',
    body: JSON.stringify({ username: document.querySelector('#username').value, name: document.querySelector('#name').value }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then( () => {
    window.location = '/'
  })
})
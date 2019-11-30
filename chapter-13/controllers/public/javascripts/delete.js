document.querySelector('a').addEventListener('click', (e) => {
  fetch(`/user/${e.currentTarget.closest('td').id}`, {
    method: 'DELETE'
    }).then( () => {
      window.location = '/'
    })
})
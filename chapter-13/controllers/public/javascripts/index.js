const deleteButtons = document.querySelectorAll('.delete')

deleteButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    fetch(`/user/${e.currentTarget.closest('tr').id}`, {
      method: 'DELETE'
    }).then( () => {
      window.location = '/'
    })
  })
})

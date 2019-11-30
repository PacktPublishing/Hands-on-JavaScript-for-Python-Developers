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

document.querySelector('.add-user').addEventListener('click', (e) => {
  fetch('/user', {
    method: 'POST'
  }).then( (data) => {
    window.location.reload()
  })
})
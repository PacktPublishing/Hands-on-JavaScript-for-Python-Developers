const addData = () => {
  fetch('/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: "This is from Ajax" })
  }).then((res) => {
    return res.json()
  }).then((data) => {
      document.querySelector('#data').innerHTML = data.message
  })
}

const deleteData = () => {
  fetch('/', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: 'message' })
  })
}

document.querySelector('#add').addEventListener('click', () => {
  addData()
  window.location = "/"
})

document.querySelector('#delete').addEventListener('click', () => {
  deleteData()
  window.location = "/"
})


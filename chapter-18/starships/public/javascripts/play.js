document.querySelectorAll('.fire').forEach((el) => {
  el.addEventListener('click', (e) => {
    fetch(`/play/fire?attacker=${e.target.closest('td').dataset.attacker}&target=${e.target.previousSibling.previousSibling.value}&weapon=phasers`).then(response => response.json()).then(data => {
      console.log(data)
    })
  })
})
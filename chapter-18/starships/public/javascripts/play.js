document.querySelectorAll('.fire').forEach((el) => {
  el.addEventListener('click', (e) => {
    const target = e.target.previousSibling.previousSibling.value
    fetch(`/play/fire?attacker=${e.target.closest('td').dataset.attacker}&target=${target}&weapon=phasers`).then(response => response.json()).then(data => {
      const { registry, name, shields, torpedoes, hull, scuttled } = data
            
      if (scuttled) {
        document.querySelector(`[data-ship=${registry}]`).remove()
        document.querySelectorAll(`option[value=${registry}]`).forEach(el => el.remove())

        document.querySelector("#modal-1-title").innerHTML = `${name} destroyed!`
        MicroModal.show('modal-1')
        return
      }

      const targetShip = document.querySelector(`[data-ship=${registry}]`)

      targetShip.querySelector('.shields').innerHTML = shields
      targetShip.querySelector('.torpedoes').innerHTML = torpedoes
      targetShip.querySelector('.hull').innerHTML = hull
      
    })
  })
})

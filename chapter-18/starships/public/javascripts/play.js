document.querySelectorAll('.fire').forEach((el) => {
  el.addEventListener('click', (e) => {
    const target = e.target.previousSibling.previousSibling.value
    fetch(`/play/fire?attacker=${e.target.closest('td').dataset.attacker}&target=${target}&weapon=phasers`).then(response => response.json()).then(data => {
      const { registry, name, shields, torpedoes, hull, scuttled } = data.target
            
      if (scuttled) {
        document.querySelector(`[data-ship=${registry}]`).remove()
        document.querySelectorAll(`option[value=${registry}]`).forEach(el => el.remove())

        const titleNode = document.querySelector("#modal-1-title")

        if (data.fleet.length === 0) {
          titleNode.innerHTML = "Your fleet has been destroyed!"
        } else if (data.enemyFleet.length === 0) {
          titleNode.innerHTML = "You've destroyed the Borg!"
        } else {
          titleNode.innerHTML = `${name} destroyed!`
        }
        
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

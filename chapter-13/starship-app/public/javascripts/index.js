document.querySelectorAll('.number').forEach((el) => {
  el.addEventListener('blur', (e) => {
    console.log(e.target.value, el.max)
    if (parseFloat(e.target.value) > parseFloat(el.max)) {
      e.target.value = el.max
    }
  
    if (parseFloat(e.target.value) < parseFloat(el.min)) {
      e.target.value = el.min
    }
  })
})
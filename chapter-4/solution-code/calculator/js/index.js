window.onload  = (() => {
  const buttons = document.getElementsByTagName('button')
  let output = document.getElementsByTagName('input')[0]
  let expression = 0

  output.value = expression

  const clickHandler = ((event) => {
    /** Write your calculator logic here.
        Use conditionals and math to modify the output variable.
        Use parseInt and a new function, isNaN, to test against value
        to determine what to do.
    */

    if (value === '=') {
      output.value = eval(expression)
      expression = output.value
    } else if (value === 'all-clear') {
      expression = 0
      output.value = 0
    } else if (isNaN(parseFloat(value))) {
      expression += value
    } else {
      expression += parseInt(value)
      output.value = expression
    }
  })
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = clickHandler
  }
})

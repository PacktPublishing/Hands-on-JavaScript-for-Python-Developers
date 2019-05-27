window.onload  = (() => {
  const buttons = document.getElementsByTagName('button')
  let output = document.getElementsByTagName('input')[0]
  let expression = 0

  output.value = expression

  const clickHandler = ((event) => {
    let value = event.target.value

    /** Write your calculator logic here.
        Use conditionals and math to modify the output variable.
        Use parseInt and a new function, isNaN, to test against value
        to determine what to do.
    */

    if (isNaN(parseFloat(value))) {
      expression += value
      console.log(expression)
    } else {
      expression += parseInt(value)
      output.value = expression
    }
  })
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = clickHandler
  }
})

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

        Expected things to use:
          eval() - this should be used sparingly as it is an expensive operation.
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
          isNan() - also a new introduction.
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
          parseFloat()
          parseInt()
          String concatenation
          Assignment
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

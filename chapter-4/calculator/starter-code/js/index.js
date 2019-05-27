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
          eval() - this is new and should be used sparingly.
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
          isNan() - also new.
          https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
          parseFloat()
          parseInt()
          String concatenation
          Assignment
    */
  })
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = clickHandler
  }
})

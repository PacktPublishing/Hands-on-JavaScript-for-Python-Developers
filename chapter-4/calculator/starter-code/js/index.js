window.onload = (() => {
  const buttons = document.getElementsByTagName('button')
  const output = document.getElementsByTagName('input')[0]
  let operation = null
  let expression = firstNumber = secondNumber = 0

  output.value = expression

  const clickHandler = ((event) => {
    let value = event.target.value

    /** Write your calculator logic here.
        Use conditionals and math to modify the output variable.

        Example of how to use the operators object:
          operators['='](1, 2) // returns 3

        Expected things to use:
          if/else
          switch() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
          parseFloat()
          String concatenation
          Assignment
    */

  })

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = clickHandler
  }

  const operators = {
    '+': function(a, b) {
      return a + b
    },
    '-': function(a, b) {
      return a - b
    },
    '*': function(a, b) {
      return a * b
    },
    '/': function(a, b) {
      return a / b
    }
  };
})

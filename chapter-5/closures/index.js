  function sayHello(name) {
    const sayAlert = function() {
      alert(greeting)
    }

    let greeting = `Hello ${name}`
    return sayAlert
  }

  sayHello('Alice')()
  alert(greeting)

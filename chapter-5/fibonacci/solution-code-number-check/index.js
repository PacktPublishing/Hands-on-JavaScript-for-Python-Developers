function fibonacci(num) {
  let a = 1,
    b = 0,
    temp

  while (num >= 0) {
    temp = a
    a = a + b
    b = temp
    num--
  }

  return b
}

let response = prompt("How many numbers?")
while (typeof(parseInt(response)) !== "number" || !Number.isInteger(parseFloat(response))) {
  response = prompt("Please enter an integer:")
}

alert(`The Fibonacci number is ${fibonacci(response)}`)

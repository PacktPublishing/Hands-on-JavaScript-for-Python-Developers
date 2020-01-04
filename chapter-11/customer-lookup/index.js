const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const customers = []

getCustomers()
ask()

function getCustomers() {
  const files = fs.readdirSync('data')

  for (let i = 0; i < files.length; i++) {
    const data = fs.readFileSync(`data/${files[i]}`)
    customers.push(JSON.parse(data))
  }
}

function ask() {
  rl.question(`There are ${customers.length} customers. Enter a number to see details:\n`, (customer) => {
    if (customer > customers.length || customer < 1) {
      console.log("Customer not found. Please try again")
    } else {
      console.log(customers[customer - 1])
    }
    ask()
  })
}
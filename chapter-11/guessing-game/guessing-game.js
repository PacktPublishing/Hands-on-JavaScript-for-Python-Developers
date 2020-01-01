const readline = require('readline')
const randomNumber = Math.ceil(Math.random() * 10)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

askQuestion()

function askQuestion() {
  rl.question('Enter a number from 1 to 10:\n', (answer) => {
    evaluateAnswer(answer)
  })
}

function evaluateAnswer(guess) {
  if (parseInt(guess) === randomNumber) {
    console.log("Correct!\n")
    rl.close()
    process.exit(1)
  } else {
    console.log("Incorrect!")
    askQuestion()
  }
}
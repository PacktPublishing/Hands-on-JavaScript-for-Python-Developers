const axios = require('axios')
const readline = require('readline')
const inquirer = require("inquirer")

const BASE_URL = "https://swapi.co/api/"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


async function searchFor() {
  rl.question("Who would you like to search for?: \n", async (answer) => {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}people/?search=${answer}`
    })

    processResults(response.data)
  })
}

async function processResults(data) {
  if (data.count > 1) {
    const responses = data.results.map(datum => datum.name)

    const question = {
      type: "list",
      name: "PERSON",
      message: `There are ${data.count} responses to your query. Select a character:`,
      choices: responses
    }

    const { PERSON } = await inquirer.prompt(question)
    const personData = data.results.filter(obj => {
      return obj.name === PERSON
    })

    requestMoreInformation(personData[0])
  }
}

async function requestMoreInformation(data) {
  const question = {
    type: "list",
    name: "MOREDATA",
    message: `What information would you like to know about ${data.name}?\n More about:`,
    choices: Object.keys(data)
  }

  const { MOREDATA } = await inquirer.prompt(question)

  // this is a URL to follow. Follow it and provide the name
  if (typeof (data[MOREDATA]) === 'string' && isURL(data[MOREDATA])) {
    const moredata = await getData(data[MOREDATA])
    console.log(moredata.name)
  } else if (typeof (data[MOREDATA]) === 'string') {
    console.log(data[MOREDATA])
  } else {
    const promises = []

    data[MOREDATA].forEach((datum) => {
      promises.push(getData(datum))
    })

    Promise.all(promises)
      .then( async (values) => {
        const data = {}

        const choices = values.map((value) => {
          data[(value.name || value.title)] = value.url

          return (value.name || value.title)
        })

        const supplementaryQuestion = {
          type: "list",
          name: "SUPPLEMENT",
          message: `Find out more information about which of the ${MOREDATA}?:`,
          choices: choices
        }
    
        const { SUPPLEMENT } = await inquirer.prompt(supplementaryQuestion);
    console.log(SUPPLEMENT)
        getData(data[SUPPLEMENT])

      })
  }

  requestMoreInformation(data)
}

async function getData(url) {
  const data = await axios({
    method: 'get',
    url: url
  })

  return data.data
}

function isURL(str) {
  return /http/.test(str)
}

searchFor()
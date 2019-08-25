class SWAPI {
  constructor() {
    this.loader = document.querySelector('#loader')
    this.people = []

    document.querySelector('.go').addEventListener('click', (e) => {
      this.getPerson(document.querySelector('#peopleSelector').value)
    })
  }

  fetchThis(url, arr, resolve, reject) {
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        arr = [...arr, ...data.results]

        if (data.next !== null) {
          this.fetchThis(data.next, arr, resolve, reject)
        } else {
          resolve(arr)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getPeople() {
    new Promise((resolve, reject) => {
        this.fetchThis('https://swapi.co/api/people', this.people, resolve, reject)
      })
      .then((response) => {
        this.people = response
        const peopleSelector = document.querySelector('#peopleSelector')

        this.people.forEach((person) => {
          const option = document.createElement('option')
          option.value = person.url
          option.innerHTML = person.name
          peopleSelector.appendChild(option)
        })
        this.toggleLoader()
        document.querySelector('#people').style.visibility = 'visible'
      })
      .catch((err) => {
        console.log(err)
      })
  }

  getPerson(url) {
    this.toggleLoader()
    fetch(url)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        document.querySelector('#person').style.visibility = 'visible'
        document.querySelector('#person h2').innerHTML = json.name
        this.toggleLoader()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  toggleLoader() {
    if (this.loader.style.visibility === 'visible' || this.loader.style.visibility === '') {
      this.loader.style.visibility = 'hidden'
    } else {
      this.loader.style.visibility = 'visible'
    }
  }
}

const s = new SWAPI().getPeople()

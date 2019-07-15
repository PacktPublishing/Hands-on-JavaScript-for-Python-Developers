class SWAPI {
  constructor() {
    this.loader = document.querySelector('#loader')
    this.people = []
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

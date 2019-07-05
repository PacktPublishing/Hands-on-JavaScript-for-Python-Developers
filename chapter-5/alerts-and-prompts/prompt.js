const Officer = function(name, rank, posting) {
  this.name = name
  this.rank = rank
  this.posting = posting

  this.ask = () => {
    const values = ['name', 'rank', 'posting']

    let answer = prompt("What would you like to know about this officer?")
    answer = answer.toLowerCase()

    if (values.indexOf(answer) < 0) {
      alert('Value not found')
    } else {
      alert(this[answer])
    }
  }
}

const Riker = new Officer("Will Riker", "Commander", "U.S.S. Enterprise")

Riker.ask()

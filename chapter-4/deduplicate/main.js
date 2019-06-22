const myArray = ['oh no', 'goodbye', 'hello', 'hello', 'goodbye']

function unique(a) {
  return a.sort().filter(function(item, pos, ary) {
    return !pos || item != ary[pos - 1]
  })
}

console.log(unique(myArray))

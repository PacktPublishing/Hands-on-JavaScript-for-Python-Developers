const a = [1, 3, 5, 7, 9]
const b = [2, 5, 7, 9, 14]

// compute the products of each permutation for efficient retrieval

const products = {}

const makeProducts = function(array1, array2) {
  array1.forEach((multiplicant) => {
    if (!products[multiplicant]) {
      products[multiplicant] = {}
    }
    array2.forEach((multiplier) => {
      if (!products[multiplier]) {
        products[multiplier] = {}
      }
      products[multiplicant][multiplier] = multiplicant * multiplier
      products[multiplier][multiplicant] = products[multiplicant][multiplier]
    })
  })
}

const getProducts = function(a, b) {
  // make an efficient means of retrieval
  if (products[a]) {
    return products[a][b] || null
  }
  return null
}

makeProducts(a, b)

console.log(getProducts(a[4], b[0])) // 18
console.log(getProducts(a[0], b[0])) // 2
console.log(getProducts(a[1], b[3])) // 27
console.log(getProducts(a[4], b[2])) // 63
console.log(getProducts(a[10], b[2])) // null

// bonus: get an arbitrary key/value pair. If nonexistent, compute it and store it.

const getOrMakeProducts = function(a, b) {
  if (!products[a] || !products[a][b]) {
    makeProducts([a], [b])
  }
  return products[a][b]
}


console.log(getOrMakeProducts(1100, 11234)) // 12357400
console.log(getProducts(1100, 11234)) // 12357400
console.log(getProducts(11234, 1100)) // 12357400

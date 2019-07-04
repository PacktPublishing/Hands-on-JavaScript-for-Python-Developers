const a = [1, 3, 5, 7, 9]
const b = [2, 5, 7, 9, 14]

// compute the products of each permutation for efficient retrieval

const products = {}

const makeProducts = async function(array1, array2) {
  const promises = []
  array1.forEach((multiplicant) => {
    if (!products[multiplicant]) {
      products[multiplicant] = {}
    }
    array2.forEach(async (multiplier) => {
      if (!products[multiplier]) {
        products[multiplier] = {}
      }

      promises.push(new Promise(resolve => resolve(calculation(multiplicant, multiplier))))
      promises[promises.length - 1].then((val) => {
        products[multiplicant][multiplier] = products[multiplier][multiplicant] = val
      })
    })
  })
  return promises
}

const getProducts = function(a, b) {
  // make an efficient means of retrieval

  if (products[a]) {
    return products[a][b] || null
  }
  return null
}

async function calculation(value1, value2) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return value1 * value2
}

makeProducts(a,b).then((arrOfPromises) => {
  Promise.all(arrOfPromises).then(() => {
    console.log(a[4],b[0], getProducts(a[4], b[0])) // 18
  })
})

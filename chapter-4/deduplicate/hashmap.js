const myArray = ['oh no', 'goodbye', 'hello', 'hello', 'goodbye']

function unique_fast(a) {
  const seen = {};
  const out = [];
  let len = a.length;
  let j = 0;
  for (let i = 0; i < len; i++) {
    const item = a[i];
    if (seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}

console.log(unique_fast(myArray))

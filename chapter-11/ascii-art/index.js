const asciify = require('asciify-image')

asciify(__dirname + '/image.jpg', { fit: 'box', width: 25, height: 25}, (err, converted) => {
  console.log(err || converted)
})
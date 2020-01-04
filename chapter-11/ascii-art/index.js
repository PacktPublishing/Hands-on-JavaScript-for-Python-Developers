const ImageToAscii = require('image-to-ascii')

ImageToAscii(__dirname + '/image.jpg', (err, converted) => {
  console.log(err || converted)
})
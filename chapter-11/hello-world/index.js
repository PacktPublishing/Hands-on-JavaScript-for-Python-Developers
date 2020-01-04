const http = require('http')
const ImageToAscii = require('image-to-ascii')
const Convert = require('ansi-to-html')
const convert = new Convert()

const css = `
<style>
body {
  background-color: #000;
}
* {
  font-family: "Courier New";
  white-space: pre-wrap;
}
</style>
`

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  ImageToAscii(__dirname + '/img/image.jpg', (err, converted) => {
    res.write(css)
    res.end(convert.toHtml(err || converted))
  })
}).listen(8080)
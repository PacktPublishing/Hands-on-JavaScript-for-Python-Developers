const http = require('http')
const asciify = require('asciify-image')
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
  asciify(__dirname + '/img/image.jpg', { fit: 'box', width: 25, height: 25 }, (err, converted) => {
    res.write(css)
    res.end(convert.toHtml(err || converted))
  })
}).listen(8080)
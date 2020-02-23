const express = require('express');
const path = require('path');

const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, '../build')));
/*
app.get('/search', (req, res) => {
  const { lat, lng, value } = req.query

  client.search({
    term: value,
    latitude: lat,
    longitude: lng,
    categories: 'Restaurants'
  }).then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.write(response.body);
    res.end();
  })
    .catch(e => {
      console.error('error', e)
    })
});
*/
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../build/index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
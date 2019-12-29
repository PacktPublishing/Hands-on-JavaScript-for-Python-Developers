const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());


// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/get', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(path.join(__dirname, 'public/json/customerlist.json'), "utf8")));
});

app.get('/api/get/:id', (req, res) => {
  let file = path.join(__dirname, `public/json/customer${req.params.id}.json`)

  if (!fs.existsSync(file)) {
    res.json({});
  } else {
    res.json(JSON.parse(fs.readFileSync(file, "utf8")));
  }
});

app.delete('/api/save/:id', (req, res) => {
  let file = path.join(__dirname, `public/json/customer${req.params.id}.json`)
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);

    const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/json/customerlist.json'), "utf8"));
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === req.params.id) {
        list.splice(i,1)
        break;
      }
    };

    fs.writeFileSync(path.join(__dirname, `public/json/customerlist.json`), JSON.stringify(list));

    res.sendStatus(200);
  } else {
    res.sendStatus(200);
  }
});

app.post('/api/save/:id', (req, res) => {
  fs.writeFileSync(path.join(__dirname, `public/json/customer${req.params.id}.json`), JSON.stringify(req.body.data));

  const customer = {
    id: req.body.data.id,
    name: req.body.data.name,
    email: req.body.data.email,
    phone: req.body.data.phone
  };
  const list = JSON.parse(fs.readFileSync(path.join(__dirname, 'public/json/customerlist.json'), "utf8"));
console.log(customer.id)
  let customerFound = false;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === customer.id) {
      list[i] = customer;
      customerFound = true;
      break;
    }
  };

  if (!customerFound) {
    list.push(customer);
  }

  fs.writeFileSync(path.join(__dirname, `public/json/customerlist.json`), JSON.stringify(list));

  res.sendStatus(200);
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  if ((/js|css|ico|json|svg/).test(req.params["0"])) {
    res.sendFile(path.join(__dirname + req.params["0"].replace("customer","client/build")));
  } else {
    res.sendFile(path.join(__dirname + `/client/build/index.html`));
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
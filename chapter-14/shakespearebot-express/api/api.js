const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database(path.join(__dirname, '../shakespeare.sqlite'))

const app = express();

const PORT = process.env.PORT || 3001;


app.get('/speak', (req, res) => {
  db.serialize(() => {
    if (req.query.question.length === 0) {
      res.send([{ PlainText: "Get thee to a nunnery!" }])
      return
    }
    db.all(`SELECT PlainText FROM shakespeare_text WHERE PlainText LIKE '%${req.query.question}%' LIMIT 1`, (err, data) => {
      if (data.length === 0) {
        res.send("Get thee to a nunnery!")
        return
      }

      res.send(data[Math.round(Math.random()*data.length)-1].PlainText.replace(/\n/g, ''))
    })
  })

});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
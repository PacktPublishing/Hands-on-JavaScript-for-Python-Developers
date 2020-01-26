const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res, next) => {
  res.render('upload');
});

router.post('/', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req,  (err, fields, files) => {
    if (err) {
      res.render('error', { error: err });
    }

    fs.rename(files.filetoupload.path, `${__dirname}/../public/images/${files.filetoupload.name}`, (err) => {
      if (err) throw err;
      res.render('index');
    });
  });
});

module.exports = router;

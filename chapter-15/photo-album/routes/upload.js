const express = require('express');
const formidable = require('formidable');
const router = express.Router();
const fs = require('fs');

router.post('/', (req, res, next) => {
  const form = new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
      file.path = __dirname + '/../public/images/' + file.name
    })
});

module.exports = router;

var express = require('express');
const fs = require('fs');

var router = express.Router();

router.get('/', function(req, res, next) {
  fs.readdir(`${__dirname}/../public/images`, (err, files) => {
      if (err) {
        res.json({
          path: '',
          files: []
        });
        return;
      }

      const data = {
        path: 'images/',
        files: files.splice(1,files.length) // remove the .gitignore
      };
      res.json(data);
  });

});

module.exports = router;

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
        files: files
      };

      res.json(JSON.stringify(data));
  });

});

module.exports = router;

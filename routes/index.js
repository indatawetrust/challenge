const express = require('express');
const router = express.Router();
const path = require('path');

if (process.env.NODE_ENV === "prod") {
  router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
} else {
  router.get('/', function(req, res, next) {
    res.send('run in production mode..')
  });
}

module.exports = router;

var express = require('express');
var router = express.Router();

const { models } = require('../models');

const { Task } = models;

router.get('/', function(req, res, next) {
  res.json({
    ok: true
  });
});

module.exports = router;

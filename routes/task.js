var express = require('express');
var router = express.Router();

const {models} = require('../models');

const {Task} = models;

router.get('/', function(req, res, next) {
  Task.find()
    .then(tasks => {
      res.json({
        data: tasks,
      });
    })
    .catch(error => next(error));
});

module.exports = router;

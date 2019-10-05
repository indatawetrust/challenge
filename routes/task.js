var express = require('express');
var router = express.Router();

const {models} = require('../models');

const {Task} = models;

router.get('/', function(req, res, next) {
  Task.find()
    .sort({
      createdAt: 'desc',
    })
    .then(tasks => {
      res.json(tasks);
    })
    .catch(error => next(error));
});

router.post('/', function(req, res, next) {
  const {text} = req.body;

  const task = new Task({
    text,
  });

  task
    .save()
    .then(task => {
      res.json(task);
    })
    .catch(error => next(error));
});

router.put('/:id', function(req, res, next) {
  const {id} = req.params;
  const {completed} = req.body;

  Task.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        completed,
      },
    },
    {
      new: true,
    },
  )
    .then(task => {
      res.json(task);
    })
    .catch(error => next(error));
});

router.delete('/:id', function(req, res, next) {
  const {id} = req.params;

  Task.remove({
    _id: id,
  })
    .then(data => {
      res.json({
        _id: id,
      });
    })
    .catch(error => next(error));
});

module.exports = router;

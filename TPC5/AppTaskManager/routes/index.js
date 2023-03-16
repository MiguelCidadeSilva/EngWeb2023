var express = require('express');
var router = express.Router();
var Tarefa = require('../controllers/Tarefa')
var User = require('../controllers/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

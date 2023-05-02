var express = require('express');
var router = express.Router();
var axios = require('axios');
var env = require('../config/env');


/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get(env.apiAccessPoint+"/emd")
  .then(response => {
    res.render('emds', {emds:response.data});
  })
  .catch(err => {
    res.render('error', {error: err})
  })
});

router.get('/:id', function(req, res, next) {
  axios.get(env.apiAccessPoint+"/emd/"+req.params.id)
  .then(response => {
    console.log(response.data)
    res.render('emd', {emd:response.data});
  })
  .catch(err => {
    res.render('error', {error: err})
  })
});






module.exports = router;

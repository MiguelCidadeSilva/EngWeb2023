var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/pessoas', function(req, res, next) {
  Pessoa.list()
  .then(dados => res.json(dados))
  .catch(erro => res.status(601).res.json(erro))
  });

  router.get('/pessoas/:id', function(req, res, next) {
    Pessoa.getPessoa(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(602).res.json(erro))
    });

  router.post('/pessoas',(req,res)=> {
    Pessoa.addPessoa(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).res.json(erro))
  });

  router.put('/pessoas/:id',(req,res)=> {
    Pessoa.updatePessoa(req.body)
    .then(dados => res.json(dados))
    .catch(erro => res.status(604).res.json(erro))
  });

  router.delete('/pessoas/:id',(req,res)=> {
    Pessoa.deletePessoa(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.json(erro))
  });

module.exports = router;
var express = require('express');
var router = express.Router();
var Emd = require('../controllers/emd.js')


router.get('/api/emd', function(req, res, next) {
  const resOK = req.query.res;
  if(resOK==="OK"){
    Emd.getResOK()
    .then(dados => res.json(dados))
    .catch(erro => res.status(601).res.json(erro))
  }
  else{
  Emd.list()
  .then(dados => res.json(dados))
  .catch(erro => res.status(601).res.json(erro))
}
});

router.get('/api/modalidades', function(req, res, next) {
  Emd.getModalidades()
  .then(dados => res.json(dados))
  .catch(erro => res.status(601).res.json(erro))
});


router.get('/api/atletas',function(req,res,next){
  const gen = req.query.gen;
  const clube = req.query.clube
  const modalidade = req.query.modalidade
  if (gen === 'F') {
    Emd.listFem()
    .then(dados => res.json(dados))
    .catch(erro => res.status(601).res.json(erro))
  }
  if (clube){
    Emd.getEmdsClube(clube)
    .then(dados => res.json(dados))
    .catch(erro => res.status(601).res.json(erro))
  }
  if (modalidade){
    Emd.getEmdsModalidade(modalidade)
    .then(dados => res.json(dados))
    .catch(erro => res.status(601).res.json(erro))
  }
})


router.get('/api/emd/:id', function(req, res, next) {
  Emd.getEmd(req.params.id)
  .then(dados => res.json(dados))
  .catch(erro => res.status(601).res.json(erro))
});


module.exports = router;

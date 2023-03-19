var express = require('express');
var router = express.Router();
var Tarefa = require('../controllers/Tarefa')
var User = require('../controllers/User')

/* GET home page. */
router.get('/', function(req, res, next) {
  Tarefa.getTarefas()
  .then(tasks =>
  {
    User.getUtilizadores()
    .then(users => 
    {
      var dictnames = {}
      users.forEach(elem => dictnames[elem.id] = elem.nome)
      tasks.sort((u1,u2) => {
        if (dictnames[u1.who] && dictnames[u2.who]) {
          return dictnames[u1.who].localeCompare(dictnames[u2.who])
        } else {
          return 0
        }
      })
      var toDo = tasks.filter(elem => elem.done == 0)
      var done = tasks.filter(elem => elem.done != 0)
      res.render('index', {listOfUsers:  users, todo: toDo, done: done, dictnames: dictnames});
    })
    .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de users'})})  
  })
  .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
});

router.get('/tarefa/edit/:tid', function(req, res, next){
  Tarefa.get(req.params.tid)
  .then( t => 
      {
          User.getUtilizadores()
          .then(users =>
          {
              res.render('editTarefa', { listOfUsers:  users, tarefa: t});
          })
      }
  )    
  .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
  
})

router.get('/tarefa/done/:tid', function(req, res, next){
  Tarefa.get(req.params.tid)
  .then(t => 
      {
          res.render('done', { tarefa: t});
      })  
  .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tasks'})})
})


//POSTS

router.post('/',function(req, res, next){
  var data = req.body
  if(data.who)
  {
      Tarefa.insertTarefa(data)
      .then(result => res.redirect('/'))    
      .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tarefas'})})

  }
  else
  {
      User.insertUser(data)
      .then(result => res.redirect('/'))    
      .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tarefas'})})
  }
})

router.post('/tarefa/edit/:tid', function(req, res, next){
  Tarefa.update(req.body)
  .then( _ => res.redirect("/"))    
  .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tarefas'})})
  
})

router.post('/tarefa/done/:tid', function(req, res, next){
  Tarefa.get(req.params.tid)
  .then( t => {
    t["done"] = 1
    return Tarefa.update(t)
    .then(_ => {res.redirect("/")})
  })    
  .catch(erro => {res.render('error', {error: erro, message:'Erro ao obter a lista de tarefas'})})
  
})

module.exports = router;

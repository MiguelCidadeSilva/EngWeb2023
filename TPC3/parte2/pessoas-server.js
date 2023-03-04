var fs = require('fs')
var http = require('http')
var mypages = require('./mypages')
var axios = require('axios')

var opcoes = [
    {'link':"http://localhost:7777/pessoas", 'name':'Listagem de pessoas'},
    {'link':"http://localhost:7777/distribuicaosexo", 'name':"Distribuição de pessoas por sexo"},
    {'link':"http://localhost:7777/distribuicaodesporto", 'name':"Distribuição por desporto"},
    {'link':"http://localhost:7777/top10profissoes", 'name':"Top 10 de profissões"}
]

http.createServer(function (req,res){
    var d = new Date().toISOString().substring(0,16);
    console.log(req.method + " " + req.url + " " + d)
    if(req.method == 'GET')
    {
        if(req.url == '/w3.css')
        {
            fs.readFile('w3.css', function (err, data) 
            {
                res.writeHead(200, {'Content-Type': 'text/css'})
                if(err)
                    res.write("Erro na leitura " + err)
                else
                    res.write(data)
                res.end()
            })
        }
        else if(req.url == '/pessoas' || req.url.toLowerCase() == "/ordasc" || req.url.toLowerCase() == "/orddesc")
        {

            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                var ord = req.url.toLowerCase() == "/orddesc"
                res.end(mypages.getMainPage(pessoas,d,ord))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if (req.url == '/'){
            console.log('Menu Opções')
            res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
            res.end(mypages.getOptionsPage(opcoes,d))
        }
        else if(req.url == '/distribuicaosexo'){
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.paginaSexo(pessoas,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url.match(/sexo\/.+/)){
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var sexo = req.url.substring(14)
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.paginaUmSexo(pessoas,d,sexo))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url == '/distribuicaodesporto'){
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.paginaDesportos(pessoas,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url.match(/desporto\/.+/)){
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var desporto =  decodeURIComponent(req.url.substring(18))
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.paginaUmDesporto(pessoas,d,desporto))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url == '/top10profissoes'){
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getProfissoes(pessoas,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if(req.url.match(/profissao\/.+/)){
            axios.get('http://localhost:3000/pessoas')
            .then(result =>
            {
                var profissao =  decodeURIComponent(req.url.substring(19))
                var pessoas = result.data
                var frase = "Recuperei " + pessoas.length + " registos."
                console.log(frase)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.paginaProfissao(pessoas,d,profissao))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })
        }
        else if (req.url.match(/p\d+/))
        {
            axios.get('http://localhost:3000/pessoas/' + req.url.substring(9))
            .then(result =>
            {
                var pessoa = result.data
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end(mypages.getPersonPage(pessoa,d))
            })
            .catch(erro =>
            {
                console.log("Erro: " + erro)
                res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
                res.end("<p>"+erro+"</p>")
            })    
        }
        else
        {
            res.writeHead(200, {'Content-Type': 'text/html; charset="utf-8'})
            res.end("<p>Pedido inválido</p>")
        }
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...');
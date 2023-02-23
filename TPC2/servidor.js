var http = require('http')
var fs = require('fs')
var url = require('url')

function responde(pedido,res){
    fs.readFile('paginasweb/' + pedido + '.html', 'utf8', function(err, data){
        res.writeHead(200,{'Content-Type':'text/html; charset="utf-8'})
        if(err){
            res.write("Erro na leitura do ficheiro "+err)
        }
        else{
            res.write(data)
        }
        res.end()
    })
}

http.createServer(function(req, res){
    var pedido = url.parse(req.url,true).pathname
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method+" "+req.url+" "+d)

    if(pedido == '/' || pedido == '/index'){
        responde('index',res)
    }
    else if(pedido[1]=='c'){ //caracter 1 porque tem a barra
        responde(pedido.substring(1),res)
    }
}).listen(7778)

console.log("Servidor à escuta na porta 7778...")
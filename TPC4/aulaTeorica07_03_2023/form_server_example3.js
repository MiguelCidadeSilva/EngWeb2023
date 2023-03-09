// form_server_example.js
// RPCW2023: 2023-03-06
// by jcr

var http = require('http')
var formTemplates = require('./formTemplates')
var static = require('./static.js')
const { parse } = require('querystring'); //parse da querystring posso passar a usa-lo na variavel

// Server creation

var formServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": {
                    // GET /register --------------------------------------------------------------------
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(formTemplates.personForm(d))
                    res.end()
                    break
                }
            case "POST": {
                    // POST /persons -------------------------------------------------------------------
                    let body = ''
                    var person = {}
                    req.on('data', chunk => {
                        body += chunk.toString(); // convert Buffer to string
                    });
                    req.on('end', () => {
                        person = parse(body)
                        console.dir(person)
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(formTemplates.personPostConfirmPage(person, d))
                        res.end()
                    });
                    break
            }
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

formServer.listen(7777, ()=>{
    console.log("Server listening on 7777...")
})



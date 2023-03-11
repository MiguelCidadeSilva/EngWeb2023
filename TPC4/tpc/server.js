
var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');

function adicionaUser(res,result)
{
    axios.post("http://localhost:3000/users", result)
    .then( response => {
        let a = response.data
        showMainPage(res)   
    })
    
}

function adicionaTask(res,result)
{
    axios.post("http://localhost:3000/tasks" ,result)
    .then( response => {
        let a = response.data
        showMainPage(res)   
    })
}


function getUtilizadores()
{
    return axios.get("http://localhost:3000/users/?_sort=nome")
    .then(res => 
        {
            return res.data
        })
}

function getTarefas()
{
    return axios.get("http://localhost:3000/tasks/")
    .then(res => 
        {
            return res.data
        })
}

function showMainPage(res)
{
    getTarefas()
    .then(tarefas=>
    {
        getUtilizadores()
        .then(users=>
            {
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(templates.showPage(users,tarefas))
        })
    })
}

function editTarefa(res,task)
{
    getUtilizadores()
    .then(users =>
        {
            axios.get("http://localhost:3000/tasks/" + task)
            .then( result =>
                {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end(templates.editTask(result.data,users))
                }
            )
        }
    )
    
}

function saveEdit(req,res,task)
{
    collectRequestBodyData(req, result => 
    {
        if(result)
        {
            axios.put("http://localhost:3000/tasks/" + task,result)
            .then( result =>
                {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.end(templates.success("Editing of task "+ task))           
                }
            )
        }
    })
}


function doneTarefa(res,task)
{ 
    axios.get("http://localhost:3000/tasks/" + task)
    .then( result =>
    {
        result.data['done'] = 1
        axios.put("http://localhost:3000/tasks/" + task, result.data)
        .then( ignore =>
            {
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.end(templates.success("Task "+ task))     
            }
        )
    }
)
}



function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function adiciona(req,res){
    collectRequestBodyData(req,callback=>
    {
        if(callback){
            if(callback.who!=undefined) adicionaTask(res,callback)
            else adicionaUser(res,callback)
        }
    })
}


// Server creation

var server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                if(req.url == "/"){
                   showMainPage(res)
                }
                else if(/\/tarefa\/edit\/.+/.test(req.url)){
                    var tarefa = decodeURIComponent(req.url.split('/')[3])
                    editTarefa(res,tarefa)
                }
                else if(/\/tarefa\/done\/.+/.test(req.url)){
                    var tarefa = decodeURIComponent(req.url.split('/')[3])
                    doneTarefa(res,tarefa)
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/'){
                    adiciona(req,res)
                }
                else if(/\/tarefa\/edit\/.+/.test(req.url))
                {
                    var task = req.url.split('/')[3]
                    saveEdit(req,res,task)
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})
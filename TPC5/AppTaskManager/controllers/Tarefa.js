var axios = require('axios')

module.exports.insert= tarefa =>
{
    axios.post("http://localhost:3000/tasks" ,tarefa)
    .then(res => {return res.data})
    .else(erro=>{return erro})
}

module.exports.getTarefas = () =>
{
    return axios.get("http://localhost:3000/tasks/")
    .then(res => {return res.data})
    .else(erro=>{return erro})
}

module.exports.get = id =>
{
    return axios.get(`http://localhost:3000/tasks/${id}`)
        .then(response => { return response.data})
        .catch(error => {return error})
}

module.exports.update = tarefa =>
{
    return axios.put(`http://localhost:3000/tasks/${tarefa.id}`,tarefa)
        .then(response => { return response.data})
        .catch(error => {return error})
}
var axios = require('axios')

module.exports.getUtilizadores = () =>
{
    return axios.get("http://localhost:3000/users/?_sort=nome")
    .then(res => {return res.data})
    .else(erro=>{return erro})
}

module.exports.insert= user =>
{
    axios.post("http://localhost:3000/users", user)
    .then(res => {return res.data})
    .else(erro=>{return erro})
}
var axios = require('axios')

module.exports.getUtilizadores = () =>
{
    return axios.get("http://localhost:3000/users/?_sort=nome")
    .then(res => {return res.data})
    .catch(erro=>{return erro})
}

module.exports.insertUser = user =>
{
    return axios.post("http://localhost:3000/users", user)
    .then(res => {return res.data})
    .catch(erro=>{return erro})
}
var Pessoa = require("../models/pessoa")

//Student list
module.exports.list = () => {
    return Pessoa
            .find()
            .sort({nome:-1})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}

module.exports.getPessoa = (id) => {
    return Pessoa
            .findOne({_id:id})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}

module.exports.addPessoa = t=>{
    return Pessoa
            .create(t)
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}

module.exports.updatePessoa = t =>{
    return Pessoa
            .updateOne({_id: t._id},a)
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}

module.exports.deletePessoa = id =>{
    return Pessoa
            .deleteOne({_id:id})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}
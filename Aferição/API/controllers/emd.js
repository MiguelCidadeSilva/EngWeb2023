var Emd = require("../models/emd")

module.exports.list = () => {
    return Emd
            .find({}, { _id: 1, nome: 1, dataEMD: 1, resultado: 1 })
            .sort({data:-1})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}

module.exports.getEmd = (id) => {
    return Emd
            .findOne({_id:id})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}


module.exports.getModalidades=()=>{
    return Emd
            .distinct("modalidade")
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })

}


module.exports.getResOK = () => {
    return Emd
            .find({resultado:true})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}


module.exports.getEmdsModalidade = (modalidade) => {
    return Emd
            .find({modalidade:modalidade})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}

module.exports.listFem = () => {
    return Emd
            .find({género:"F"})
            .sort({data:-1})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}


module.exports.getEmdsClube = (clube) => {
    return Emd
            .find({clube:clube})
            .then(dados => {
                return dados
            })
            .catch(erro=>{
                return erro
            })
}
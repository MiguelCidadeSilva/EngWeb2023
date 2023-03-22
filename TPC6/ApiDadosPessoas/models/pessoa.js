var mongoose = require('mongoose');

const atributoSchema = {
    fumador : Boolean,
    gosta_cinema : Boolean,
    gosta_viajar : Boolean,
    acorda_cedo : Boolean,
    gosta_ler : Boolean,
    gosta_musica : Boolean,
    gosta_comer : Boolean,
    gosta_animais_estimacao : Boolean,
    gosta_dancar : Boolean,
    comida_favorita : String
}

const moradaSchema = {
    cidade : String,
    distrito : String
}

const partido_politicoSchema = {
    party_abbr: String,
    party_name : String
}

var pessoaSchema = new mongoose.Schema({
    _id : String,
    nome : String,
    idade: Number,
    sexo: String,
    profissao: String,
    religiao: String,
    marca_carro: String,
    descricao : String,
    desportos: [String],
    animais: [String],
    figura_publica_pt: [String],
    destinos_favoritos : [String],
    atributos : atributoSchema,
    morada : moradaSchema,
    partido_politico : partido_politicoSchema

})

module.exports = mongoose.model('pessoa', pessoaSchema)
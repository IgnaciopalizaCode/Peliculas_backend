const mongoose = require('mongoose')
const {Schema} = mongoose;
const usuarioSchema = new Schema({
    email: {type: String},
    nombre: {type: String, required:true},
    contrasenia: {String},
    admin: {type: Boolean, default:false},
    peliculas: {type:String}//TODO vincular con peliculas
})
const Usuario = mongoose.model('Usuario',usuarioSchema)
module.exports = Usuario
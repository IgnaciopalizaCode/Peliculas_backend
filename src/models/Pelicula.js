const mongoose = require('mongoose')

const peliculaSchema = mongoose.Schema({
    codigo: Number,
    nombre: String,
    descripcion: String,
    categoria: String,
    publicado: Boolean,
    destacado: Boolean,
    vista: {type:Boolean, default:false}
})
const Pelicula = mongoose.model('Pelicula',peliculaSchema)
module.exports = Pelicula
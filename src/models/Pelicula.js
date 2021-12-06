const mongoose = require('mongoose')

const peliculaSchema = mongoose.Schema({
    codigo: Number,
    nombre: String,
    director: String,
    protagonistas: String,
    duracion: String,
    trailer: String,
    fecha_de_Estreno: String,
    descripcion: String,
    categoria: String,
    publicado: Boolean,
    destacado: Boolean,
    vista: {type:Boolean, default:false}
})
const Pelicula = mongoose.model('Pelicula',peliculaSchema)
module.exports = Pelicula
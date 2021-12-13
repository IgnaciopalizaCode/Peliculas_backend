const mongoose = require("mongoose");

const peliculaSchema = mongoose.Schema({
  codigo: { type: Number },
  nombre: { type: String },
  director: { type: String },
  protagonistas: { type: String },
  duracion: { type: String },
  trailer: { type: String },
  imagen: { type: String },
  fecha_de_Estreno: { type: String },
  sinopsis: { type: String },
  genero: { type: String },
  publicado: { type: Boolean },
  destacado: { type: Boolean, default: false },
  vista: { type: Boolean, default: false },
});
const Pelicula = mongoose.model("Pelicula", peliculaSchema);
module.exports = Pelicula;

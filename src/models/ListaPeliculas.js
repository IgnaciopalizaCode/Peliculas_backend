const mongoose = require("mongoose");

const listaPeliculasSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  genero: { type: String },
  tipo: { type: String },
  contenido: { type: Array },
});
const ListaPeliculasSchema = mongoose.model(
  "ListaPeliculasSchema",
  listaPeliculasSchema
);
module.exports = ListaPeliculasSchema;

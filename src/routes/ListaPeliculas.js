const router = require("express").Router();
const ListaPeliculas = require("../models/ListaPeliculas.js");

//CREAR
router.post("/", async (req, res) => {
  const nuevaListaPeliculas = new ListaPeliculas(req.body);
  try {
    const listaPeliculaGuardada = await nuevaListaPeliculas.save();
    res.status(201).json(listaPeliculaGuardada);
  } catch (err) {
    res.status(500).json(err);
  }
});

//BORRAR
router.delete("/:id", async (req, res) => {
  try {
    await ListaPeliculas.findByIdAndDelete(req.body.id);
    res.status(201).json("La lista fue borrada");
  } catch (err) {
    res.status(500).json(err);
  }
});


// OBTENER SEGUN TIPO
router.get("/", async (req, res) => {
  const tipoQuery = req.query.tipo;
  //const generoQuery = req.query.genero;
  let lista = [];
  try {
    if (tipoQuery) {
      lista = await ListaPeliculas.aggregate([
        { $sample: { size: 10 } },
        { $match: { tipo: tipoQuery } },
      ]);
    } else {
      lista = await ListaPeliculas.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(lista)
  } catch {
      res.status(500).json(err)
  }
});



//MODIFICAR
router.put("/:id", async (req, res) => {
  try {
    const listaPeliculasMdificada = await ListaPeliculas.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(listaPeliculasMdificada);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

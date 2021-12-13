const router = require("express").Router();
const Pelicula = require("../models/Pelicula");

//CREAR
router.post("/", async (req, res) => {
  const nuevaPelicula = new Pelicula(req.body);
  try {
    const peliculaGuardada = await nuevaPelicula.save();
    res.status(201).json(peliculaGuardada);
  } catch (err) {
    res.status(500).json(err);
  }
});

//MODIFICAR
router.put("/:id", async (req, res) => {
  try {
    const peliculaModificada = await Pelicula.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(peliculaModificada);
  } catch (err) {
    res.status(500).json(err);
  }
});

//BORRAR
router.delete("/:id", async (req, res) => {
  try {
    await Pelicula.findByIdAndDelete(req.params.id);
    res.status(200).json("La pelicula fue borrada");
  } catch (err) {
    res.status(500).json(err);
  }
});

//OBTENER
router.get("/", async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.status(200).json(peliculas);
  } catch (err) {
    res.status(500).json(err);
  }
});

//OBTENER
router.get("/:id", async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    res.status(200).json(pelicula);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

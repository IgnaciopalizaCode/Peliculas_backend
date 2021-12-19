const express = require('express');
const app = express();
const cors = require('cors')
const database = require('./database.js');
const  mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const peliculaRoute = require("./Peliculas")
const listaPeliculaRoute = require("./ListaPeliculas")



//middlewares
app.use(cors())
app.use(express.json())
app.use("/api/peliculas", peliculaRoute)
app.use("/api/listapeliculas", listaPeliculaRoute)


//modelos de datos
const Usuario = require('../models/Usuario');
const Pelicula = require('../models/Pelicula');
require('dotenv').config();


console.log("ejecutado en index js")
mongoose.connect("mongodb://127.0.0.1:27017/finaldb1").then(console.log("conectado a finaldb1"));

app.listen(process.env.PORT, ()=>{
    console.log(`ejecutando servidor en puerto ${process.env.PORT}`)
})
app.get('/',(req,res)=>{
    console.log("ROOT")
    res.send("ROOT")
})

app.post('/usuario', async (req,res) => {
    try{
        const data = req.body
        //TODO validacion de la data en el servidor
        const usuario = await Usuario.create(data)
        res.json(usuario)
    } catch(e){
        console.log(e)
    }
    
})
app.get('/usuarios',(req,res) => {
    //Usuario.find().populate('peliculas');
    console.log("GET USUARIOS")
})
app.get('/usuarios/:nombre',(req,res) => {
    let nombre= req.params.nombre;
    //Usuario.find().populate('peliculas');
    console.log("GET USUARIOS")
})

app.put('/usuarios',(req,res) => {
    console.log("PUT USUARIOS")
})
app.patch('/usuarios',(req,res) => {
    console.log("PATCH USUARIOS")
})
app.delete('/usuarios',(req,res) => {
    console.log("DELETE USUARIOS")
})





app.post('/register', (req, res) => 
{
    let data = req.body
    
    let user = Usuario.getUsuarioByEmail(data.email);

        if(user.email === data.email)
        {
            res.send("ya existe un usuario registrado con ese correo");
        }
       else
      {
            const usuario = Usuario.createUsuario(data, data.contrasenia);
        console.log(JSON.stringify(data));  
        if(usuario)
        {
            res.send(usuario);
        }
        else
        {
            res.send({message:"Datos Invalidos"})
        }
       }
})

app.post('/logIn' ,(req ,res) => {
    const {nombre, contrasenia} = req.body;
    Usuario.findOne({nombre: nombre}, (err, user) => {
        if(user)
        {
            if(contrasenia === user.contrasenia)
            {
              res.send("Inicio de sesion exitoso");
            }
            else
            {
              res.send("Contraseña Incorrecta");
            }
        }else
        {
            res.send("Usuario Inexistente");
        }
    })
})


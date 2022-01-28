const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session');
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
const { Redirect } = require('request/lib/redirect');
const { redirect } = require('express/lib/response');
require('dotenv').config();


console.log("ejecutado en index js")

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

    Usuario.getUsuarioByEmail(data.email)
    .then((user) => {
        if(user)
        {
            res.send("ya existe un usuario registrado con ese correo");
        }
        else
        {
            const usuario = Usuario.createUsuario(data);
            if(usuario)
            {
              res.send({message:"Registro Exitoso"});
            }
            else
            {
              res.send({message:"Datos Invalidos"})
            }
        }
    });
})

app.get('/logIn' ,(req ,res) => {
    let data = req.body;
    Usuario.getUsuarioByEmail(data.email)
    .then((user) => {
        if(user)
        {
            console.log(bcrypt.compareSync(data.contrasenia, user.contrasenia))
            if(bcrypt.compareSync(data.contrasenia, user.contrasenia))
            {
              res.send(user);
              redirect('/');
            }
            else
            {
                res.send("Contraseña incorrecta");
            }
           
        }else
        {
            res.send("Usuario Inexistente");
        }
    });
})


const express = require('express');
const app = express();
const cors = require('cors')
const database = require('./database.js');
const  mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
//middlewares
app.use(cors())
app.use(express.json())
//modelos de datos
const Usuario = require('../models/Usuario')
const Pelicula = require('../models/Pelicula');
const { request, response } = require('express');
const { mongo } = require('mongoose');
const { Mongoose } = require('mongoose');
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

app.post('/pelicula', async (req,res) => {
    try{
        const data = req.body
        //TODO validacion de la data en el servidor
        const pelicula = await Pelicula.create(data)
        res.json(pelicula)
    } catch(e){
        console.log(e)
    }
    
})

app.get('/pelicula',(req,res) => {
    console.log("GET pelicula")
})

app.put('/pelicula',(req,res) => {
    console.log("PUT pelicula")
})
app.patch('/pelicula',(req,res) => {
    console.log("PATCH pelicula")
})
app.delete('/pelicula',(req,res) => {
    console.log("DELETE pelicula")
})

app.post('/register', (req, res) => 
{
    let data = req.body

    const email = data.email;
    const nombre = data.nombre;
    const contrasenia = data.contrasenia;
    const admin = false;
    const peliculas = [];
    const eliminado = false;
    Usuario.findOne({email: email}, (err,user) => 
    {
      if(user)
      {
        res.send({message:'Ya existe un usuario con ese correo'});
      }
      else
      {
        
        let newUser = {
            nombre,
            email,
            contrasenia,
        };

        const usuario = Usuario.create(newUser);
        
        if(usuario)
        {
            res.send({message:"Registro Exitoso"});
        }
        else
        {
            res.send({message:"Datos Invalidos"})
        }
      }
    })
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


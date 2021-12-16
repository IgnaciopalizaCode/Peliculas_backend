const express = require('express');
const app = express();
const cors = require('cors')
const database = require('./database.js');
const  mongoose  = require('mongoose');
//middlewares
app.use(cors())
app.use(express.json())
//modelos de datos
const Usuario = require('../models/Usuario')
const Pelicula = require('../models/Pelicula');
const { request, response } = require('express');

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

app.post('/register', (req, res))
{
    const{nombre, email, contrasenia} = req.body;
    Usuario.findOne({email: email}, (err,user) => 
    {
      if(user)
      {
        res.send({message:'Ya existe un usuario con ese correo'});
      }
      else
      {
        const newUser = new Usuario({
            nombre,
            email,
            contrasenia
        })
        newUser.save(err => {
           if(err)
           {
               res.send(err);
           }
           else
           {
               res.send('Registro Existoso');
           }

        })

      }

    })
  
}

app.post('/logIn' ,(req ,res))
{
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
}

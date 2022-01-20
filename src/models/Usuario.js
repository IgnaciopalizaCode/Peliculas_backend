const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {Schema} = mongoose;
const usuarioSchema = new Schema({
    email: {type: String},
    nombre: {type: String, required:true},
    contrasenia: {type: String},
    admin: {type: Boolean, default:false},
    peliculas: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pelicula'        },//TODO vincular con peliculas
    eliminado: {type: Boolean, default:false}
})
const Usuario = mongoose.model('Usuario',usuarioSchema)


function getUsuarioByNombre(nombreU){
    const usuario = Usuario.findOne(nombreU);
    const user = Usuario.findOne({nombre: nombreU});
    console.log(usuario);
    console.log(user);
    return usuario;
}
const getUsuario=()=>{
    const usuario = Usuario.find();
    return usuario;
}
const createUsuario=(data)=>{
    let {email,nombre,admin,eliminado,contrasenia} = data;
    let hashpass = bcrypt.hashSync(contrasenia, 8);
    let user= {
        email,
        nombre,
        contrasenia : hashpass,
        admin,
        eliminado
    };
    const usuario = Usuario.create(user);
    return usuario;
}
function getUsuarioByEmail(mailU){
    const user = Usuario.findOne({email : mailU});
    return user;
}
function validateLogIn(userMail, contrasenia)
{
    const user = Usuario.findOne({email : userMail});
    const hashPassword = bcrypt.hashSync(contrasenia, 8);
    if(user.contrasenia === hashPassword)
    {
        return user;
    }
    else
    {
        console.log("contraseña incorrecta")
    }
}

module.exports = {Usuario, createUsuario, getUsuarioByEmail, validateLogIn}
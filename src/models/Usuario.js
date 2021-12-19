const mongoose = require('mongoose')
const {Schema} = mongoose;
const usuarioSchema = new Schema({
    email: {type: String},
    nombre: {type: String},
    contrasenia: {String},
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
const createUsuario=(data,password)=>{
    let {email,nombre,admin,eliminado} = data;
    let user= {
        email,
        nombre,
        contrasenia: password,
        admin,
        eliminado
    };
    const usuario = Usuario.create(user);
    return usuario;
}
function getUsuarioByEmail(mailU){
    const user = Usuario.findOne({email: mailU});
    console.log(user);
    return user;
}

module.exports = {Usuario, createUsuario, getUsuarioByEmail}
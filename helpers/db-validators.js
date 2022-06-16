const Role = require('../models/role');
const Usuario = require('../models/usuario');

//Validación de rol contra roles en BD
const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD.`)
    }
}

//Validacion del correo contra correos en la BD
const emailExiste = async(correo = '') => {
    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya se encuentra registrado.`)
    }
}

//Validacion del id contra los id's en la BD
const existeUsuarioPorId = async(id) => {
    //Verificar si el id NO existe
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Id no existe : ${ id }`)
    } //Si el id existe no entra a la condición
}

module.exports ={
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
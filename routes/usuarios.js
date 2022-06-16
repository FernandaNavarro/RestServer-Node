const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido,emailExiste,existeUsuarioPorId} = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');
const { 
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
],usuariosPut);

router.post('/', [
    //middleware de validacion 
    check('nombre','El nombre es obligatorio').not().isEmpty(), 
    check('password','El password debe ser más de 6 letras').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(), 
    check('correo').custom(emailExiste),
    //  check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']) ,
    //Validación de rol contra roles en BD
    check('rol').custom(esRoleValido),
    validarCampos  
],usuariosPost);

router.patch('/', usuariosPatch);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);




module.exports = router;
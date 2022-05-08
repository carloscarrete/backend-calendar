//Rutas de Usuarios / Auth
// host +/api/auth
const { Router } = require('express');
const { register, login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const {validate} = require('../middlewares/validate');
const {validateJWT} = require('../middlewares/validate-jwt');

const route = Router();

route.post('/register',
    [
    check('name', 'El nombre es un campo obligatorio').not().isEmpty(),
    check('email', 'El email es un campo obligatorio').isEmail(),
    check('password', 'La contraseñoa debe de ser mínimo de 6 dígitos').isLength({ min: 6 }),
    validate
    ],   //Middlewire
    register);
route.post('/',
    [
        check('email', 'El email es un campo obligatorio').isEmail(),
        check('password', 'La contraseñoa debe de ser mínimo de 6 dígitos').isLength({ min: 6 }),
        validate
    ], login);
route.get('/renew', validateJWT, renewToken);



module.exports = route;
const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../helpers/jwt');

const register = async (req, res) => {

    try {

        const { email, password } = req.body;

        let user = await Usuario.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe para este correo'
            })
        }

        usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generateToken(usuario.id, usuario.name);

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor, pongase en contacto con el administrador'
        })
    }
}


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con este correo'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña es erronea'
            })
        }

        const token = await generateToken(usuario.id, usuario.name);


        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Por favor, pongase en contacto con el administrador'
        })
    }

}

const renewToken = async (req, res) => {

    const uid = req.uid;
    const name = req.name;
    const token = await generateToken(uid, name);

    res.json({
        ok: true,
        msg: 'Renew Token',
        token
    })
}


module.exports = {
    register,
    renewToken,
    login
}
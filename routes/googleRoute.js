const express = require('express');
const bodyParser = require("body-parser");
const { googleAuth } = require("google-auth-struct");
const routerGoogle = express.Router();
const dbLivros = require('../models/livroModel.js');
const dbUsers = require('../models/userModel.js');

routerGoogle.use(bodyParser.urlencoded({ extended: true }));
routerGoogle.use(bodyParser.json());

routerGoogle.post('/loginGoogle', async (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';
    var listaLivros = await dbLivros.find();
    var qntdUsuarios = await dbUsers.count();
    var googleAuthentication = (await googleAuth(token, client_id)).selectAll();

    googleAuthentication.then(resultado => {
        let jsonDados = {
            usuario: resultado['name'], 
            email: resultado['email'],
            qntdUsuarios: qntdUsuarios
        }
        req.session.user = jsonDados;
        return res.render('menu', { status: 200, listaLivros: listaLivros, usuario: resultado['name'], email: resultado['email'], qntdUsuarios: qntdUsuarios });
    });
});

module.exports = routerGoogle;
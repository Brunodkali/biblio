const express = require('express');
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");
const routerGoogle = express.Router();
const database = require('../models/database.js');

routerGoogle.use(cookies());
routerGoogle.use(bodyParser.urlencoded({ extended: true }));
routerGoogle.use(bodyParser.json());

routerGoogle.post('/loginGoogle', (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';
    const { OAuth2Client } = require('google-auth-library');
    const client = new OAuth2Client(client_id);

    if (!token) {
        return res.status(401).json({Error: 'Token não identificado!'});
    }

    (async () => {
        try {
            const ticket = await client.verifyIdToken({
                idToken: token, 
                audience: client_id, 
            });
            const payload = ticket.getPayload();
            const nomeUser = payload["name"];
            const emailUser = payload["email"];
            const imgUser = payload["picture"];
            const listaUsuarios = await database.collection('usuarios').find().toArray();
            const listaGrupos = await database.collection('grupos').find().toArray();
            let jsonDados = { 
                usuario: nomeUser, 
                email: emailUser,
                avatarImg: imgUser,
                auth: 'googleAuth', 
                listaUsuarios: listaUsuarios,
                listaGrupos: listaGrupos
            }

            req.session.user = jsonDados;

            for (let i = 0; i < listaUsuarios.length; i++) {
                const userGoogle = listaUsuarios[i]['email'];

                if (userGoogle == emailUser) {
                    return res.status(200).render('menu', jsonDados);
                }
            }
            if (emailUser) {
                const userAdd = await database.collection('usuarios').insertOne({
                    name: nomeUser,
                    email: emailUser,
                    avatar: imgUser,
                });
                return res.status(200).render('menu', jsonDados);
            }
        }catch(err) {
            return err;
        }
    })();
});

module.exports = routerGoogle;
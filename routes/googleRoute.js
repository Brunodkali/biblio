const express = require('express');
const cookies = require("cookie-parser");
const bodyParser = require("body-parser");
const routerGoogle = express.Router();
const dbUsuarios = require('../models/classUsers.js');
const dbLivros = require('../models/classLivros.js');

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
            const listaUsuarios = await dbUsuarios.selectUsers();
            const listaLivros = await dbLivros.selectLivros();
            // let jsonDados = { 
            //     usuario: nomeUser, 
            //     email: emailUser,
            //     avatarImg: imgUser,
            //     auth: 'googleAuth', 
            //     listaUsuarios: listaUsuarios,
            //     listaGrupos: listaGrupos
            // }
            // req.session.user = jsonDados;

            for (let i = 0; i < listaUsuarios.length; i++) {
                const userGoogle = listaUsuarios[i]['email'];

                if (userGoogle == emailUser) {
                    console.log(userGoogle, emailUser);
                    res.send(`Usuário conectado: ${nomeUser}, livros disponíveis: ${listaLivros[0]['titulo']}`);
                }else {
                    const userAdd = await dbUsuarios.insertUsers({
                        nome: nomeUser,
                        email: emailUser,
                    });
                    res.send(`Usuário conectado: ${nomeUser}, livros disponíveis: ${listaLivros[0]['titulo']}`);
                }
            }
        }catch(err) {
            return err;
        }
    })();
});

module.exports = routerGoogle;
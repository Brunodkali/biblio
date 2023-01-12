const { googleAuth } = require('google-auth-struct');
const dbLivros = require('../models/livroModel.js');
const dbUsers = require('../models/userModel.js');

module.exports.loginGoogle = async (req, res) => {
    const token = req.body.credential;
    const client_id = process.env.GOOGLE_CLIENT_ID || '245073186631-0aq6pl4ailrqeruehjuvhkk35iuem2e6.apps.googleusercontent.com';
    var listaLivros = await dbLivros.find();
    var qntdUsuarios = await dbUsers.count();
    var googleAuthentication = (await googleAuth(token, client_id)).getUserData();

    googleAuthentication.then(resultado => {
        let jsonDados = {
            status: 200,
            usuario: resultado['name'], 
            email: resultado['email'],
            listaLivros: listaLivros,
            qntdUsuarios: qntdUsuarios
        }
        req.session.user = jsonDados;
        return res.render('menu', jsonDados);
    });
};
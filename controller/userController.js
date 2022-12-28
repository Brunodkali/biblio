const dbUsuarios = require('../models/classUsers.js');
const dbLivros = require('../models/classLivros.js');
const md5 = require('md5');

module.exports.login = async (req, res) => {
    try{
        let login = req.body.email;
        let senha = req.body.senha;
        let senhaHash = md5(senha);
        let listaUsuarios = await dbUsuarios.selectUsers();
        let listaLivros = await dbLivros.selectLivros();
        try {
            for(let i = 0; i < listaUsuarios.length; i++) {
                let nomeUsuario = listaUsuarios[i].nome;
                let emailUsuario = listaUsuarios[i].email;
                let senhaUsuario = listaUsuarios[i].senha;

                if(login == emailUsuario && senha == senhaUsuario){
                    let usuario = nomeUsuario[0].toUpperCase() + nomeUsuario.substr(1);
                    // let jsonDados = { 
                    //     usuario: usuario, 
                    //     email: emailUsuario,
                    //     auth: 'databaseAuth'
                    // }
                    // req.session.user = jsonDados;
                    res.send(`Usuário conectado: ${usuario}, livros disponíveis: ${listaLivros[0]['titulo']}`);
                }
            }
            if (login != null || senha != null) {
                return res.status(401).redirect('/');
            }
         }catch(err) {
            return err;
        }
    }catch(err) {
        return res.send('Ocorreu um erro na autenticação');
    }
};

module.exports.registrar = async (req, res) => {
    try {
        let login = req.body.login;
        let nome = req.body.nome;
        let senha = req.body.senha;
        let confSenha = req.body.confSenha;
    
        try {
            if (senha == confSenha) {
                let hashSenha = md5(senha);
                let userAdd = await Usuarios.create({
                    name: nome,
                    email: login,
                    senha: hashSenha,
                    avatar: './public/imgUsers/avatar0.png',
                });
                return res.status(200).render('index');
            }else {
                return res.status(401).render('cadastro', { status: 401 });
            }
        }catch(err) {
            return err;
        }
    }catch(err) {
        return err;   
    }
};

module.exports.trocarSenha = async (req, res) => {
    try {
        let emailTroca = req.body.emailTroca;
        let senhaTroca = req.body.senhaTroca;
        let confSenhaTroca = req.body.confSenhaTroca;
    
        try {
            if (senhaTroca == confSenhaTroca) {
                let filter = { email: emailTroca };
                let options = { upsert: false };
                let hashSenhaNova = md5(senhaTroca);
                let senhaNova = { 
                   $set: {
                        senha: hashSenhaNova 
                    }
                }
                let update = await Usuarios.updateOne(filter, senhaNova, options);
    
                return res.status(200).render('index');
            }else {
                return res.status(401).render('trocarSenha', { status: 401 });
            }
        }catch(err) {
            return err;
        }
    }catch(err) {
        return err
    }
};

module.exports.logOut = (req, res) => {
    try {
        return res.status(200).render('index');
    }catch(err) {
        return err;
    }
};
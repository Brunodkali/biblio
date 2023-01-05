const dbUsuarios = require('../models/userModel.js');
const dbLivros = require('../models/livroModel.js');
const md5 = require('md5');

module.exports.login = async (req, res) => {
    try{
        let login = req.body.email;
        let senha = req.body.senha;
        let senhaHash = md5(senha);
        let listaUsuarios = await dbUsuarios.find();
        let listaLivros = await dbLivros.find();

        try {
            for(let i = 0; i < listaUsuarios.length; i++) {
                let nomeUsuario = listaUsuarios[i].nome;
                let emailUsuario = listaUsuarios[i].email;
                let senhaUsuario = listaUsuarios[i].senha;

                if(login == emailUsuario && senha == senhaUsuario){
                    let usuario = nomeUsuario[0].toUpperCase() + nomeUsuario.substr(1);
                    let jsonDados = { 
                        usuario: usuario, 
                        email: emailUsuario,
                        listaLivros: listaLivros
                    }
                    req.session.user = jsonDados;
                    res.render('menu', jsonDados); 
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

module.exports.filtro = async (req, res) => {
    try {
        let pesquisa = req.body.filtro;
        let jsonDados = req.session.user;
        console.log(pesquisa);
        let listaLivrosFiltros = await dbLivros.find(
            {"titulo": {'$regex': pesquisa}},
            {"editora": {'$regex': pesquisa}},
            {"autor": {'$regex': pesquisa}},
        );
        console.log(listaLivrosFiltros);   
        return res.render('menu', { listaLivros: listaLivrosFiltros, usuario: jsonDados['usuario'], email: jsonDados['email'], qntdUsuarios: jsonDados['qntdUsuarios'] });
    }catch(err) {
        return err;
    }
};
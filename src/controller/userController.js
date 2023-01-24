const dbUsuarios = require('../models/userModel.js');
const dbLivros = require('../models/livroModel.js');
const md5 = require('md5');

module.exports.login = async (req, res) => {
    try{
        let login = req.body.email;
        let senha = req.body.senha;
        let senhaHash = md5(senha);
        let listaUsuarios = await dbUsuarios.find();
        let qntdUsuarios = await dbUsuarios.count();
        let listaLivros = await dbLivros.find();

        try {
            for(let i = 0; i < listaUsuarios.length; i++) {
                let nomeUsuario = listaUsuarios[i].nome;
                let emailUsuario = listaUsuarios[i].email;
                let senhaUsuario = listaUsuarios[i].senha;

                if(login == emailUsuario && senhaHash == senhaUsuario){
                    let usuario = nomeUsuario[0].toUpperCase() + nomeUsuario.substr(1);
                    let jsonDados = { 
                        status: 200,
                        usuario: usuario, 
                        email: emailUsuario,
                        listaLivros: listaLivros,
                        qntdUsuarios: qntdUsuarios
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

module.exports.cadastro = async (req, res) => {
    try {
        let login = req.body.email;
        let nome = req.body.nome;
        let senha = req.body.senha;
        let confSenha = req.body.confSenha;

        try {
            if (senha == confSenha) {
                let hashSenha = md5(senha);

                await dbUsuarios.create({
                    nome: nome,
                    email: login,
                    senha: hashSenha,
                })
                .then(() => {
                    return res.status(200).render('index');
                })
                .catch((err) => {
                    return res.status(500).send('Ocorreu um erro ao cadastrar o usuário');
                });
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
        let nomeUser = await dbUsuarios.find({ email: emailTroca });

        try {
            if (senhaTroca == confSenhaTroca) {
                if (nomeUser.length > 0) {
                    let filter = { email: emailTroca };
                    let options = { upsert: false };
                    let hashSenhaNova = md5(senhaTroca);
                    let senhaNova = { 
                    $set: {
                            senha: hashSenhaNova 
                        }
                    }
                    let update = await dbUsuarios.updateOne(filter, senhaNova, options);
        
                    return res.status(200).render('index');
                }else {
                    return res.status(401).render('esqueceuSenha', { status: 404 });  
                }
            }else {
                return res.status(401).render('esqueceuSenha', { status: 401 });
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
        let listaLivrosFiltros = await dbLivros.find({
            $or : [
                {"titulo": {'$regex': new RegExp(pesquisa, 'i')} },
                {"editora": {'$regex': new RegExp(pesquisa, 'i')}},
                {"autor": {'$regex': new RegExp(pesquisa, 'i')}}
            ]
        });
        
        if (listaLivrosFiltros.length <= 0) {
            return res.render('menu', { 
                status: 201, 
                usuario: jsonDados['usuario'], 
                email: jsonDados['email'], 
                qntdUsuarios: jsonDados['qntdUsuarios'] 
            });
        }
        return res.render('menu', { 
            status: jsonDados['status'], 
            usuario: jsonDados['usuario'], 
            email: jsonDados['email'], 
            listaLivros: listaLivrosFiltros, 
            qntdUsuarios: jsonDados['qntdUsuarios'] 
        });
    }catch(err) {
        return err;
    }
};
const { login, cadastro, trocarSenha, filtro } = require("../controller/userController.js");
const { loginGoogle } = require('../controller/googleController.js');
const router = require("express").Router();

router.post("/loginGoogle", loginGoogle);
router.post("/loginDB", login);
router.post("/cadastre", cadastro);
router.post("/esqueceu", trocarSenha);
router.post("/filtros", filtro);

router.get("/cadastro", (req, res)=> {
    res.render('cadastro', { status: 200 });
});

router.get("/esqueceuSenha", (req, res)=> {
    res.render('esqueceuSenha', { status: 200 });
});

module.exports = router;
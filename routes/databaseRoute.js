const { login, cadastro, trocarSenha, filtro } = require("../controller/userController.js");
const router = require("express").Router();

router.post("/loginDB", login);
router.post("/cadastre", cadastro);
router.post("/filtros", filtro);

router.get("/cadastro", (req, res)=> {
    res.render('cadastro', { status: 200 });
});

module.exports = router;
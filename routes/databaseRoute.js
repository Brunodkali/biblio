const { login, registrar, trocarSenha, filtro } = require("../controller/userController.js");
const router = require("express").Router();

router.post("/loginDB", login);
router.post("/filtros", filtro);

module.exports = router;
const { login, registrar, trocarSenha, logOut } = require("../controller/userController.js");
const router = require("express").Router();

router.post("/loginDB", login);

module.exports = router;
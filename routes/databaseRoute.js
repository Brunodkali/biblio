const { login, registrar, trocarSenha, logOut } = require("../controllers/userController.js");
const router = require("express").Router();

router.post("/loginDB", login);

router.get('/trocarSenha', async(req, res) => {
    res.render('trocarSenha', { status: 200 });
});
  
module.exports = router;
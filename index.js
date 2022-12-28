const express = require('express');
const app = express();
const port = process.env.port || 3000;
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const session = require('express-session');
const databaseAuth = require('./routes/databaseRoute.js');
const googleAuth = require('./routes/googleRoute.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));
app.use('/public', express.static(path.join(__dirname, '/src/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
app.use('/', databaseAuth, googleAuth);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, (req, res) => {
    console.log(`Servidor rodando em ${port}`);
});
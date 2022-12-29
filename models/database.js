const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1/biblio')
    .then(() => {
        console.log('Banco de dados conectado');
    })
    .catch(err => {
        console.log(err);
    });
db = mongoose.connection;

module.exports = db;
const db = require('./database.js');
const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    autor: {
        type: String,
        require: true
    },
    numeroPaginas: {
        type: Number,
    },
    editora: {
        type: String
    },
    capa: {
        type: String,
    },
    conteudo: {
        type: String,
    }
});

module.exports = mongoose.model("livros", livroSchema);
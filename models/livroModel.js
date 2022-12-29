const db = require('./database.js');
const mongoose = require("mongoose");

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        require: true
    },
    numeroPaginas: {
        type: Number,
    },
    editora: {
        type: String
    },
    autor: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("livros", livroSchema);
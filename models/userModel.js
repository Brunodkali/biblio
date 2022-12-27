const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    senha: {
        type: String
    }
});

module.exports = mongoose.model("usuarios", userSchema);
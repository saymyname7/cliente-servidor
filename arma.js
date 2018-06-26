var mongoose = require("mongoose");

var armaSchema = mongoose.Schema({
    descripcion: {type: String, required:true},
    categoria: {type: String, required:true},
    fuerza: {type: String, required:true},
    municiones: {type: Boolean, required:true}
});


var Arma = mongoose.model("Arma",armaSchema);
module.exports = Arma;  
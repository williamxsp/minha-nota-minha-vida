var mongoose = require('mongoose');

var modelCurso = new mongoose.Schema({
    titulo:{
        type:String,
        required:true
    },
    ano:{
        type:Number,
        required:true,
    },
     materias:[
        {
            titulo:{
                type:String,
                required:true
            }
        }
        ]
});

module.exports = mongoose.model('Curso', modelCurso);
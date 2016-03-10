var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var modelCurso = require('./models/modelCurso');


mongoose.connect("localhost");

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.set('view engine', 'jade');



app.get('/', function(req, res){
   res.render('index');
});

app.get('/curso/', function(req, res){
    
    modelCurso.find({}, function(err, cursos){
        if(!err){
            res.render('curso/index', {cursos:cursos});
        }else{
            return res.json(err);
        }
    });
   
});


app.get('/curso/new', function(req, res){
    
   res.render('curso/form', {curso:{titulo:"", ano:"", materias:[1,2,3,4,5,6]}});
   
});

app.post('/curso', function(req, res){
   
   var curso;
   if(req.body.id){
    
    modelCurso.findById(req.body.id, function(err, curso){
        if(err) return res.json(err);
        
        if(!curso) return res.json({message:'curso inválido'});
        
        curso.titulo =req.body.titulo;
        curso.ano = req.body.ano;
        curso.materias = req.body.materias.map(function(materia){
          return {titulo:materia};
        });
        
        curso.save(function(err, curso){
          if(err){
              return res.json(err);
          }
          if(curso == null){
              return res.json({message:"Nao consegui cadastrar"});
          }
          return res.redirect('/curso');
      });
        
    });
    
   }else{
       curso = new modelCurso();
       
       curso.titulo =req.body.titulo;
        curso.ano = req.body.ano;
        curso.materias = req.body.materias.map(function(materia){
          return {titulo:materia};
        });
        
        curso.save(function(err, curso){
          if(err){
              return res.json(err);
          }
          if(curso == null){
              return res.json({message:"Nao consegui cadastrar"});
          }
          return res.redirect('/curso');
      });
      
   }
   
   
  
  
   
  
});

app.get('/curso/:id', function(req, res){
   
  modelCurso.findById(req.params.id, function(err, curso){
     res.render('curso/form', {curso:curso});
  });
});

app.get('/curso/:id/remover', function(req, res){
   
  modelCurso.findById(req.params.id, function(err, curso){
     curso.remove();
     res.redirect('/curso');
  });
});

app.get('/notas/:id', function(req, res){
   
  modelCurso.findById(req.params.id, function(err, curso){
     res.render('nota/index', {curso:curso});
  });
});


app.listen(process.env.PORT, function(){
    console.log("Running");
})


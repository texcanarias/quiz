var models = require('../models/models.js');

//Autoload - factoriza el codigo su la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
  models.Quiz.find(quizId).then(
    function(quiz){
      if(quiz){
        req.quiz = quiz;
        next();
      }
      else{
        next(new Error('No existe quizId = ' + quizId));
      }
    }
 ).catch(function(error){next(error);});
}; 


exports.index = function(req, res){
  var Filtro = "%";
  if(req.query.search){
    Filtro = "%"+req.query.search+"%";
  }
  Filtro = Filtro.replace(/\s/g,"%");

  models.Quiz.findAll({where:["pregunta like ?",Filtro]}).then(
   function(quizes){
     res.render('quizes/index.ejs', {quizes: quizes, errors: []});
    }
   ).catch(function(error){next(error);})
};


exports.show = function(req, res){
  res.render('quizes/show', {quiz: req.quiz, errors: []});
};

exports.answer = function(req, res){
  var isCorrecto = (req.query.respuesta === req.quiz.respuesta);      
  var resultado = (isCorrecto)?'Correcto':'Incorrecto';
  res.render(
    'quizes/answer', 
    {
      quiz:req.quiz, 
      respuesta:resultado, 
      errors: []
      
    });
};

exports.new = function(req, res){
  //Crear objeto quiz
  var selected = {1:"",2:"",3:"",4:"",5:""};
  var quiz = models.Quiz.build(
    {pregunta: "Pregunta", respuesta: "Respuesta", tema: 1}
  );
  res.render('quizes/new',{quiz: quiz, selected: selected, errors: []});
};

exports.create = function(req, res){
  var quiz = models.Quiz.build( req.body.quiz );
  
  quiz
  .validate()
  .then(
    function(err){
      if (err){
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      }
      else{
        quiz
        .save({fields:["pregunta", "respuesta", "tema"]})
	.then(function(){ res.redirect("/quizes")})    
      }
  });
};

exports.edit = function(req, res){
  var quiz = req.quiz;
  var selected = {1:"",2:"",3:"",4:"",5:""};
  selected[quiz.tema] = "selected";
  console.log(selected);
  res.render('quizes/edit', {quiz: quiz, selected: selected, errors:[]});
};

exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;
  
  req.quiz
  .validate()
  .then(
    function(err){
      if (err){
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      }
      else{
        req.quiz
        .save({fields:["pregunta", "respuesta", "tema"]})
	.then(function(){
	  res.redirect("/quizes");
        })    
      }
  });
};

exports.destroy = function(req, res){
  req.quiz.destroy().then(function(){
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

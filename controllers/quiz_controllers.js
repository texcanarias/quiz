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
  models.Quiz.findAll().then(
   function(quizes){
     res.render('quizes/index.ejs', {quizes: quizes});
    }
   ).catch(function(error){next(error);})
};


exports.show = function(req, res){
  res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function(req, res){
  var isCorrecto = (req.query.respuesta === quiz.respuesta);      
  var resultado = (isCorrecto)?'Correcto':'Incorrecto';
  res.render('quizes/answer', {quiz:req.quiz, respuesta:resultado});
};

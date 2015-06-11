var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controllers');
var authorControllers = require('../controllers/author_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

//Autoload de comnados con :quizId
router.param('quizId', quizControllers.load); //autoload :quizId


//Definicion de rutas de /quizes
router.get('/quizes',                     quizControllers.index);
router.get('/quizes/:quizId(\\d+)',       quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/author',		          authorControllers.author);

module.exports = router;

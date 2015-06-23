var express = require('express');
var router = express.Router();

var quizControllers = require('../controllers/quiz_controllers');
var commentControllers = require('../controllers/comment_controllers');
var authorControllers = require('../controllers/author_controllers');
var sessionControllers = require('../controllers/session_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comnados con :quizId
router.param('quizId', 		quizControllers.load); //autoload :quizId
router.param('commentId',	commentControllers.load); //autoload :commentId


//Definicio de las rutas de sesion
router.get('/login', sessionControllers.new); //Formulario de login
router.post('/login', sessionControllers.create); //crear sesion
router.get('/logout', sessionControllers.destroy); //destruir sesion (deberia ser delete)

//Definicion de rutas de /quizes
router.get('/quizes',                     quizControllers.index);
router.get('/quizes/:quizId(\\d+)',       quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer',quizControllers.answer);

router.get('/quizes/new',	          sessionControllers.loginRequired, quizControllers.new);
router.post('/quizes/create',             sessionControllers.loginRequired, quizControllers.create);
router.get('/quizes/:quizId(\\d+)/edit',  sessionControllers.loginRequired, quizControllers.edit);
router.put('/quizes/:quizId(\\d+)',       sessionControllers.loginRequired, quizControllers.update);
router.delete('/quizes/:quizId(\\d+)',    sessionControllers.loginRequired, quizControllers.destroy);

router.get('/author',		          authorControllers.author);

router.get('/quizes/:quizId(\\d+)/comments/new', 			commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', 	 			commentControllers.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',	sessionControllers.loginRequired, commentControllers.publish);


module.exports = router;

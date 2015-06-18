var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controllers');
var commentControllers = require('../controllers/comment_controllers');
var authorControllers = require('../controllers/author_controllers');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

//Autoload de comnados con :quizId
router.param('quizId', quizControllers.load); //autoload :quizId


//Definicion de rutas de /quizes
router.get('/quizes',                     quizControllers.index);
router.get('/quizes/:quizId(\\d+)',       quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer',quizControllers.answer);
router.get('/quizes/new',	          quizControllers.new);
router.post('/quizes/create',             quizControllers.create);
router.get('/quizes/:quizId(\\d+)/edit',  quizControllers.edit);
router.put('/quizes/:quizId(\\d+)',       quizControllers.update);
router.delete('/quizes/:quizId(\\d+)',     quizControllers.destroy);

router.get('/author',		          authorControllers.author);

router.get('/quizes/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', 	 commentControllers.create);


module.exports = router;

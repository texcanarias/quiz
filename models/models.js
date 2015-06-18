var path = require('path');

//var DATABASE_URL = 'mysql://root:adclick@192.168.50.223:3306/quiz';
//var url = DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user    = (url[2]||null);
var pwd     = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);

//Carga modelo ORM
var Sequelize = require('sequelize');

//Usar SQLite
var sequelize = new Sequelize(DB_name, user, pwd, 
{ dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  omitNull: true
});

//Importar la definicion de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//Importar definiciones de la tabla Comment
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;

//Crear e inicializar la BD
sequelize.sync().then(function(){
    Quiz.count().then(function(count){
       if(0 === count){
          Quiz.create({pregunta:'Capital de Portugal', respuesta:'Lisboa', tema:2});
          Quiz.create({pregunta:'Capital de Italia', respuesta:'Roma', tema:2}).then(function(){console.log('Base de datos inicializada.')}); 
       }
    });
});

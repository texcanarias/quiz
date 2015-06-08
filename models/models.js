var path = require('path');

//Carga modelo ORM
var Sequelize = require('sequelize');

//Usar SQLite
var sequelize = new Sequelize(null, null, null, {dialect:"node_sqlite", storage:"quiz.sqlite"});

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

//Crear e inicializar la BD
sequelize.sync().success(function(){
    Quiz.count().success(function(count){
       if(0 === count){
          Quiz.create({pregunta:'Capital de Italia', respuesta:'Roma'}).success(function(){console.log('Base de datos inicializada.')}); 
       }
    });
});

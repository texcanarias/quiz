//Autorizaion de accessos 
exports.loginRequired = function(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("/login");
  }
};

//get Formulario de login
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};
  req.session.cookie.maxAge = 2 * 60 * 1000;
  res.render('sessions/new', {errors: errors});
};

//post - Crear la sesion
exports.create = function(req, res){
  var login = req.body.login;
  var password = req.body.password;
  
  var userController = require('./user_controllers');
  userController.autenticar(login, password, function(error, user){
    //Si hay error retornamos mensajes de error de la sesion
    if(error){
      req.session.errors = [{"message": "Se ha producido un error: "+error}];
      res.redirect("/login");
      return;
    }
  
    //Crear req.session.user y guardar is y username
    //La sesion sedefine por la existencia de req.session.user
    req.session.user = {id:user.id, username:user.username};
    console.log(req.session);
    res.redirect(req.session.redir.toString());
  });
};

//delete - Destruir sesion
exports.destroy = function(req, res){
  delete req.session.user;
  res.redirect(req.session.redir.toString()); //redirect a path anterior al login
};

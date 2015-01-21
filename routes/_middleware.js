// para ver se esta autenticado
var helpers = {


isAuthenticated: function (req, res, next){
    // http://stackoverflow.com/questions/7990890/how-to-implement-login-auth-in-node-js/8003291#8003291
    if (!req.session.user_id) {
        res.redirect('/users/login');
  } else {
        next();
  }
}

}

module.exports = helpers;

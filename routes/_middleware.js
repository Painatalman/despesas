const passportConfig = require('../config/passportConfig');
const passport = require('passport');

// para ver se esta autenticado
var helpers = {
  // checks if json web token is already generated
  isAuthenticated: passport.authenticate('jwt', {session: false}),
  // checks if user is logged in
  isSignedIn: passport.authenticate('local', {session: false}),
}

module.exports = helpers;

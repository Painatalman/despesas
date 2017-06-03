var secretObject = require('./_secretConfig.js');
var passport = require('passport');
var User = require('../models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');

var localOptions = {
  usernameField: 'username',
  passwordField: 'password'
};
var localLogin = new LocalStrategy(localOptions, function(username, password, done){
  // console.log(username, password);

  User.findOne({
      'username': username
  }, function(err, user) {
      // console.log(err, user);

      if (err) {
          return done(err);
      } else if (user) {
        // console.log(user);
        user.comparePassword(password, function(err, isMatch) {
          // console.log(user, isMatch);

          if (err) {
            return done(err);
          } else if(isMatch) {
            return done(null, user)
          } else {
            return done(null, false);
          }
        })
      } else {
          return done('user nao existe');
      }
  });
});

// Setup options for JWT Strategy
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secretObject.secret
};

// Create JWT strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that user
    // Otherwise, call 'done' with no user object
    User.findById(payload.sub, function(err, user) {
        if (err) {
            // error, no user
            return done(err, false);
        }
        if (user) {
            // no error, user
            done(null, user);
        }
        else {
            // no error, no user
            done(null, false);
        }
    })
});

passport.use(jwtLogin);
passport.use(localLogin);

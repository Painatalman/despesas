module.exports = {
    secret: "opainatalnaoexiste",
    isValidPassword: function(user, password) {
        return bCrypt.compareSync(password, user.password);
    },
    login: function(passport, UserModel) {
        var LocalStrategy = require('passport-local').Strategy;
        var bCrypt = require('bcrypt-nodejs');

        // passport/login.js
        passport.use('login', new LocalStrategy({
                passReqToCallback: true
            },
            function(req, username, password, done) {
                // check in mongo if a user with username exists or not
                UserModel.findOne({
                        'username': username
                    },
                    function(err, user) {
                        // In case of any error, return using the done method
                        if (err)
                            return done(err);
                        // Username does not exist, log error & redirect back
                        if (!user) {
                            console.log('User Not Found with username ' + username);
                            return done(null, false,
                                req.flash('message', 'User Not found.'));
                        }
                        // User exists but wrong password, log the error 
                        if (!isValidPassword(user, password)) {
                            console.log('Invalid Password');
                            return done(null, false,
                                req.flash('message', 'Invalid Password'));
                        }
                        // User and password both match, return user from 
                        // done method which will be treated like success
                        return done(null, user);
                    }
                );
            }));
    },
    signup: function(passport, UserModel) {
        var LocalStrategy = require('passport-local').Strategy;
        var bCrypt = require('bcrypt-nodejs');

        passport.use('signup', new LocalStrategy({
                passReqToCallback: true
            },
            function(req, username, password, done) {
                findOrCreateUser = function() {
                    // find a user in Mongo with provided username
                    UserModel.findOne({
                        'username': username
                    }, function(err, user) {
                        // In case of any error return
                        if (err) {
                            console.log('Error in SignUp: ' + err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            console.log('User already exists');
                            return done(null, false,
                                req.flash('message', 'User Already Exists'));
                        } else {
                            // if there is no user with that email
                            // create the user
                            var newUser = new User();
                            // set the user's local credentials
                            newUser.username = username;
                            newUser.password = createHash(password);
                            newUser.email = req.param('email');
                            newUser.firstName = req.param('firstName');
                            newUser.lastName = req.param('lastName');

                            // save the user
                            newUser.save(function(err) {
                                if (err) {
                                    console.log('Error in Saving user: ' + err);
                                    throw err;
                                }
                                console.log('User Registration succesful');
                                return done(null, newUser);
                            });
                        }
                    });
                };

                // Delay the execution of findOrCreateUser and execute 
                // the method in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            }));
    },
    init: function(app) {
        var passport = require('passport');
        var expressSession = require('express-session');

        var User = require('../models/user');

        app.use(expressSession({
            secret: this.secret
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        // Using the flash middleware provided by connect-flash to store messages in session
        // and displaying in templates
        var flash = require('connect-flash');
        app.use(flash());

        // Passport needs to be able to serialize and deserialize users to support persistent login sessions
        passport.serializeUser(function(user, done) {
            done(null, user._id);
        });

        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        // Setting up Passport Strategies for Login and SignUp/Registration
        this.login(passport);
        this.signup(passport);

        return passport;
    }
}

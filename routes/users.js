var express = require('express');
var router = express.Router();

// encrypt shit
var bcrypt = require('bcryptjs');
var jwt = require('jwt-simple');
// user model
var User = require('../models/user.js');
var secret = require('../config/_secretConfig').secret;

// para ver se esta autenticado
var middle = require('./_middleware.js');

function generateTokenForUser(user) {
    return jwt.encode({
        // subject
        sub: user.id,
        // issued at time
        iat: new Date().getTime()
    }, secret);
}

// validar novo utilizador, ou retornar erros
// SUCESSO: retorna array vazio
// ERROS: retorna erros de codigo {
//    message: "I am the gooddamn batman!"
//}
function validate_user(username, password) {
    // RULES:
    // UNIQUE
    // from 8-20 alphanumeric characters,with either _,- or dot (.)
    // NOTE: NAO VERIFICA SE ESTA NA BD OU NAO, APENAS SE PASS E USER TEM CARACTERES EM TNATUREZA E QUANTIDADE ACEITAVEIS
    var errors = [],
        parameters = {
            username: username,
            password: password
        },
        restrictions = {
            username: {
                LENGTH: {
                    MIN: 8,
                    MAX: 20
                },
                REGEX: /[a-zA-Z-_0-9-\.]{8,20}/
            },
            password: {
                LENGTH: {
                    MIN: 8,
                    MAX: 20
                },
                REGEX: /[a-zA-Z-_0-9-\.]{8,20}/
            }
        }
    // console.log("checking...");
    for (var key in parameters) {
        // console.log(parameters[key], restrictions[key].REGEX);
        var matching = parameters[key].match(restrictions[key].REGEX);
        if (!matching || parameters[key] !== matching[0]) {
            errors.push(key + " may have unallowed and/or length");
        }
    }

    return errors;
}

// login
router.get('/login', function(req, res) {
    // console.log(req.session);
    if (req.session.user_id){
        res.redirect("/");
    }
    res.render('login');
});

// register
router.get('/register', function(req, res) {
    res.render('register');
});

// process login
router.post('/login', middle.isSignedIn, function(req, res, next) {
    // passport.js CONVENIENTLY maps the user to req.user
    // most of the logic is in middel.isSignedIn
    // it will ONLY send the token if it passes the middleware check
    // console.log(req);
    res.send({token: generateTokenForUser(req.user)});
});

router.get('/logout', function(req, res) {
    delete req.session.user_id;
    res.redirect("/users/login");
});

// process registry
router.post('/register', function(req, res, next) {

  // console.log(req.body);

    var username_pret = req.body.username,
        pass_pret = req.body.password;

    if (!username_pret || !pass_pret) {
        res.send({error: 'nome de utilizador e palavra-passe têm de ser preenchidos'})
    }

    User.findOne({
        'username': username_pret
    }, function(err, user) {
        if (err) {
            return next(err);
        }
        else if (user) {
            res.status(422).send({error: "user ja existe"});
        } else {
            // console.log(username_pret, pass_pret);
            var errors = validate_user(username_pret, pass_pret);
            // console.log(errors);
            if (errors.length === 0) {
                // hash logic is now in the model
                var novo = new User({
                    "username": username_pret,
                    "password": pass_pret
                });

                // console.log('save user');

                novo.save(function(err) {
                    if (err) {
                        // console.log(err);
                        return next(err);
                    } else {
                        res.send({token: generateTokenForUser(novo)})
                    }
                });

            } else {
                res.send({errors:errors.toString()});
            }
        }
    });
});

module.exports = router;

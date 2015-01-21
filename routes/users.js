var express = require('express');
var router = express.Router();

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
        console.log(parameters[key], restrictions[key].REGEX);
        var matching = parameters[key].match(restrictions[key].REGEX);
        if (!matching || parameters[key] !== matching[0]) {
            errors.push(key + " may have unallowed and/or length");
        }
    }

    return errors;
}

// encrypt shit
var bcrypt = require('bcrypt');

// user model
var User = require('../models/user.js');

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
router.post('/login', function(req, res) {
    // console.log(req.body);
    // console.log(req.body.username);
    User.findOne({
        'username': req.body.username
    }, function(err, user) {
        if (err)
            res.send(err);
        else if (user) {
            if (bcrypt.compareSync(req.body.password, user.password) === true) {
                req.session.user_id = user._id;
                // res.send("Bem-vindo, ", user.username);
                res.redirect("/");
            } else {
                res.send("A palavra-passe esta errada!");
            }
        } else {

            res.send("User nao existe!");
        }
    });
});

router.get('/logout', function(req, res) {
    delete req.session.user_id;
    res.redirect("/users/login");
});

// process registry
router.post('/register', function(req, res) {

    var username_pret = req.body.username,
        pass_pret = req.body.password;

    User.findOne({
        'username': username_pret
    }, function(err, user) {
        if (err)
            res.send(err);
        else if (user) {
            res.send("user ja existe");
        } else {
            var errors = validate_user(username_pret, pass_pret);
            if (errors.length === 0) {
                var salt = 10;
                var hash = bcrypt.hashSync(pass_pret, salt);

                var novo = new User({
                    "username": req.body.username,
                    "password": hash
                });

                novo.save();
                res.send("Done well");
            } else {
                res.send(errors.toString());
            }
        }
    });
});

module.exports = router;

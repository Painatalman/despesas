process.env.PWD = process.cwd();

////////////////////////////////////////////
//
// DEPENDENCIES
//
/////////////////////////////////////////////

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);


// START EXPRESS
var app = express();

////////////////////////////////////////////
//
// DB CONFIG ()
//
/////////////////////////////////////////////

var dbConfig = require('./config/dbConfig.js');
// if first parameter is set to true, it will connect to the remote database
dbConfig.init(true);

////////////////////////////////////////////
//
// APP CONFIG (basic express, view engine, file uploads)
// (or the APP.USE part)
//
/////////////////////////////////////////////
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "Ilikemetalgear",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        url: dbConfig.remote,
        // db: 'despesas',
        // host: '127.0.0.1',
        // port: 27017
    })
}));

////////////////////////////////
//
// VIEWS and VIEW ENGINE
//
/////////////////////////



app.set('views', path.join( process.env.PWD, 'views'));

var swig = require('swig');
app.engine('.html', swig.renderFile);
app.set('view engine', 'html');


///////////////////////////////////////
//
// STATIC FILE DIRECTORIES
//
///////////////////////////////////////
app.use('/public', express.static(path.join( process.env.PWD, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/uploads',express.static(path.join(__dirname, 'uploads')));

////////////////////////////////////////////
//
// ROUTING CONFIG ()
//
/////////////////////////////////////////////
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/contas', require('./routes/contas'));
app.use('/movimentos', require('./routes/movimentos'));
app.use('/tasknotes', require('./routes/tasknotes'));

/// catch 404 and forwarding to error handler
app.use(function( req, res, next) {

    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// prod error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err // for prod, replace err with {}
    });
});


module.exports = app;

'use strict';

var express = require('express');
var router = express.Router();

// files and pics and shit...
var fs = require("fs");
// var gridStream = require("gridfs-stream");
var mongoose = require("mongoose");

// models
var Tasknote = require('../models/tasknote.js'),
    User = require('../models/user.js');


// para ver se esta autenticado
var middle = require('./_middleware.js');

router.route('/')
    .all(function(req, res, next) {
        middle.isAuthenticated(req, res, next);
    });

// obter todas as memorias e formulario
router.get('/', function(req, res) {

    Tasknote.find({
        user: req.session.user_id
    }, function(error, tasknotes) {
        if (error) {
            res.send(error);
        } else {
            res.render('tasknotes.html', {
                tasknotes: tasknotes
            });
        }
        // res.json(memories);
    });
});

// adicionar uma task
router.post('/', function(req, res) {
 
        var tasknote = new Tasknote(req.body);

        // TODO: debug for error results

        User.find({
            _id: user_id
        }, function(err, user){
            if (err){
                res.send(err);
            }
            else{
                tasknote.user = user;

                tasknote.save(function(err, _tasknote) {
                if (err) {
                    console.log(err);
                    res.send(err);
                } else {
                    console.log(_tasknote);
                    res.redirect('/tasknotes?success=true');
                }
            });
            }
        })

            




    // // IMAGE FILE

    // // console.log(req.files.imagem);
    // var file_img = req.files.imagem;
    // // console.log(file_img.path);

    // if (typeof(file_img) !== 'undefined'){

    //     // check if allowed extension

    //     fs.readFile(file_img.path, function (err, data) {

    //      novaMemoria.image_extension = file_img.mimetype.replace('image/','');

    //     var d = novaMemoria.date_added;

    //       var newPath = __dirname + "/../uploads/"+novaMemoria._id+"-"+(d.getMonth()+1).toString()+"-"+d.getDay().toString()+"-"+d.getFullYear().toString()+"-"+d.getHours().toString()+"-"+d.getMinutes().toString()+"-"+d.getSeconds().toString()+"-"+d.getMilliseconds().toString()+'.'+novaMemoria.image_extension;
    //       fs.writeFile(newPath, data, function (err) {
    //         // res.redirect("back");
    //           if(!err){
    //           console.log(newPath);
    //           console.log(novaMemoria);
    //           novaMemoria.save();
    //         // por agora, as imagens serao o id mais a data mais a data atual
    //         res.send("New memory");
    //               }
    //           else{
    //               // raise error
    //               console.log("ERROR:",err);
    //               // res.render("error","mensagem");
    //           }

    //       });
    //     });

    // }

});

// atualizar uma tasknote
router.put('/:memory_id', middle.isAuthenticated, function(req, res) {
    console.dir(req.body); // fixe para ver o que foi chamado!
    // usar o findAndUpdate, mais tarde
    Tasknote.findById(req.params.tasknote_id, function(err, tasknote) {
        if (err)
            res.send(err);
        console.log("A tasknote " + task_id + " foi invocada!");

        console.log("vou tentar gravar... mais tarde");

    });
});

module.exports = router;

'use strict';

var express = require('express');
var router = express.Router();

// files and pics and shit...
var fs = require("fs");
// var gridStream = require("gridfs-stream");
var mongoose = require("mongoose");
// mongoose-form
var Bridge = require('mongoose-forms').Bridge;

// models
var Movimento = require('../models/movimento.js'),
    MovimentoForm = require('../models/forms/movimento.js'),
    User = require('../models/user.js');

// para ver se esta autenticado
var middle = require('./_middleware.js');

// middleware - check auth
/*
router.route('/:memory_id')
    .put(function(req, res, next){
        console.log("MIDDLEWARE: PUT ");
        isAuthenticated(req, res, next);
    });
router.route('/')
    .post(function(req, res, next){
        console.log("MIDDLEWARE: POST ");
        isAuthenticated(req, res, next);
    });
*/
router.route('/')
    .all(function(req, res, next){
        middle.isAuthenticated(req, res, next);
    });

// obter todas as memorias e formulario
router.get('/', function (req, res) {
   
   Movimento.find({
    conta:req.session.user_id},function(error, movimentos){
        if (error)
            {
                res.send(error);
            }
            else{
                res.render('movimentos.html',{
                    movimentos:movimentos
                });
            }
        
        // res.json(memories);
   });
});

// adicionar uma memoria
router.post('/new', function(req, res){
    
    // com form?
    var form = new MovimentoForm();

        if (!form.isValid(req.body)){
          res.redirect('/movimentos');
        }

    var movimento = Bridge(new Movimento, form).getModel()

    movimento.conta = req.session.user_id;

      movimento.save(function(err, _movimento){
        if (err){
          console.log(erro);
          res.send(err);
        }
        console.log(_movimento);
        res.send("saved!");
      })

    // var newMovimento = new Movimento();
    
    // // preencher os dados
    // newMovimento.title = req.body.title;
    // newMovimento.description = req.body.text;
    // newMovimento.date = new Date(req.body.date);
    // newMovimento.user = req.session.user_id;
    
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

// atualizar uma memoria
router.put('/:memory_id', middle.isAuthenticated, function(req, res){
    console.log("Fui invocado!");
    console.dir(req.body); // fixe para ver o que foi chamado!
    Memory.findById(req.params.memory_id, function(err, memoria){
        if (err)
            res.send(err);
        console.log("A memoria " + memoria_id + " foi invocada!");

        console.log("vou tentar gravar... mais tarde");
        /*
        memoria.save(function(err, memoria){
            if (err)
                res.send(err);
            else {console.dir(memoria);console.log("gravado!");res.json({message:"okay"});}
        });
        */
    });
});

module.exports = router;
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
    User = require('../models/user.js'),
    Schedule = require('../models/padrao_movimento.js');

// para ver se esta autenticado
var middle = require('./_middleware.js');

router.route('/*')
    .all(function(req, res, next) {
        middle.isAuthenticated(req, res, next);
    });

// obter todas as memorias e formulario
router.get('/', function(req, res, next) {
    // console.log("the user is", req.user);

    Movimento.find({
            conta: req.user.id
        },
        null, // array of fields to return
        {
            skip: 0,
            limit: 0,
            sort: {
                date: -1,
                dateAdded: -1
            }
        },
        function(error, movimentos) {
            if (error) {
                res.send(error);
            } else {
                res.json(movimentos);
                // res.render('movimentos.html', {
                //     movimentos: movimentos
                // });
            }
        });
});

// adicionar um movimento
router.post('/new', function(req, res, next) {
    var expenseData = Object.assign({},{
        date: new Date(),
        value: req.body.expense.price
    }, req.body.expense);

    var movimento = new Movimento(expenseData);
    
    movimento.conta = req.user.id;

    if (!expenseData.isDespesa) {
        movimento.isDespesa = false;
    }

    if (movimento.isDespesa === true && req.body.expense.expense_type !== "") {
        movimento.type = req.body.expense.expense_type;
    } else if (movimento.isDespesa === false && req.body.expense.income_type !== "") {
        movimento.type = req.body.expense.income_type;
    }
    movimento.save(function(err, _movimento) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log(_movimento);
            res.redirect('/movimentos?success=true');
        }
    });
});

// atualizar uma memoria
router.put('/:memory_id', middle.isAuthenticated, function(req, res) {
    console.dir(req.body); // fixe para ver o que foi chamado!
    Memory.findById(req.params.memory_id, function(err, memoria) {
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

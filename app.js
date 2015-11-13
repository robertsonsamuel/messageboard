/* globals $: false , console:false , module:false , require:false*/
'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = express();
mongoose.connect('mongodb://localhost/messageApp');

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTES
app.use('/', require('./routes/index'));

// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404');
});

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});

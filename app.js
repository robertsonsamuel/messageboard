'use strict';

var PORT = 3000;

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var marked = require('marked');

var app = express();

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});

app.get('/markdown', function(req, res) {
  res.render('markdown');
});

app.post('/markdown', function(req, res) {
  res.send(marked(req.body.md));
});

app.listen(PORT, function(){
  console.log('listening on port %s', PORT);
});

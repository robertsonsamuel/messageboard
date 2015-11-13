/* globals $: false , console:false , module:false , require:false*/
'use strict';

var express = require('express');
var router = express.Router();
var Message = require('../models/messageinfo');

router.get('/', function(req, res) {
  Message.find({}, function(err,messages){
    res.render('index' , { messages: messages } );
  });
  
});


router.put('/update', function(req,res){
  var messageId = req.body.timeold;
  console.log(req.body);
  Message.update({time: messageId}, req.body, function(err){
    res.send(messageId);
  });
});


router.delete('/delete', function(req,res){
  var time = req.body.time;
  //console.log(time);
  Message.find({ time: time }).remove().exec();
  res.send('deleted');
});

router.get('/return', function(req, res){
  Message.find({}, function(err,allMessageInfo){
   // console.log(allMessageInfo);
    res.send(allMessageInfo);

  });
});


//posts a new message
router.post('/message', function(req, res) {

  var message = new Message(req.body);
  message.save(function (err, messageInfo) {
  if (err) return console.error(err);
  //console.log(messageInfo,'saved message');
  res.send('Writen!');
  });
});



module.exports = router;

/* globals $: false , console:false , module:false , require:false*/
'use strict';

var mongoose = require('mongoose');


var messageSchema = mongoose.Schema({
  name: String,
  message: String,
  time: String,
  date: String
});


var Message = mongoose.model('Message', messageSchema);
module.exports = Message;
/* globals $: false , console:false */

var timeStamp={};

'use strict';
$(document).ready(init);


function init(){
   getMessages();
   $('#addMessage').on('click',addMessage);
   $('.deleteButton').on('click',deleteMessage);
   $('.editButton').on('click',editMessage);
   $('#updateButton').on('click',saveMessage);

}




function editMessage () {
  timeStamp.time = $(this).closest('tr').find('.Time').text();
  console.log('edit button clicked!');
  
}

function saveMessage () {
  var $data = {};
  var dateTime = getDate();
      $data.time = timeStamp.time;
      $data.name = $('#modalNameEdit').val();
      $data.message = $('#modalMessageEdit').val();
      $data.timeold = timeStamp.time;
      $data.time = dateTime.time;
      $data.date = dateTime.date;
      //console.log($data);
 
  $.ajax({
    url:'/update',
    type:'PUT',
    data: $data
  }).done(function(data,err){
    var time = timeStamp.time;
    console.log(time);
    $('table').children('tbody').children('tr').find('.Time:contains('+time+')').closest('tr').replaceWith(addToBoard($data));
    $('#edit').modal('hide');
  }

  );


  console.log('save button clicked');
}


function deleteMessage () {
   var $data ={};
      $data.time = $(this).closest('tr').find('.Time').text();

  $.ajax({
    url:'/delete',
    type:'DELETE',
    data: $data
  }).done($(this).closest('tr').remove());

}

function getDate(){
    var localDateTime = {};
    Date.prototype.today = function () { 
         return ((this.getDate() < 10)?'0':'') + this.getDate() +'/'+(((this.getMonth()+1) < 10)?'0':'') + (this.getMonth()+1) +'/'+ this.getFullYear();
    };
    Date.prototype.timeNow = function () {
         return ((this.getHours() < 10)?'0':'') + this.getHours() +':'+ ((this.getMinutes() < 10)?'0':'') + this.getMinutes() +':'+ ((this.getSeconds() < 10)?'0':'') + this.getSeconds();
    };
      var newDate = new Date();
      var datetime = 'LastSync: ' + newDate.today() + ' @ ' + newDate.timeNow();

    localDateTime.date = datetime.slice(10,20); // gets date and time strings
    localDateTime.time = datetime.slice(23,31);

    return localDateTime;

}

function getMessages () {
  var data;
  //var messages = [];
  $.ajax({
    url:'/return',
    type:'GET',
    data: data
  }).done( function(data, err){
    //  if(err) {console.log(err)};
    console.log('data: ', data, 'data length: ', data.length);
  }); 
}


function addMessage () {
  var messageInfo = {};

  var currentTimeDate = getDate();
  var date = currentTimeDate.date;
  var time = currentTimeDate.time;
  var $name = $('#NAME').val();
  var $message = $('#MESSAGE').val();


  //message object from input fields 
  messageInfo.name = $name;
  messageInfo.message = $message;
  messageInfo.time = time;
  messageInfo.date = date;


  //post to add new message 
  $.post('/message', messageInfo)
    .done(function(){
      // runs after .done 
      var $messageRow = addToBoard(messageInfo);
      $('#messageBoard').append($messageRow);
    })
    .fail(function(err){
      console.error(err);
    });


    $('input').each(function(index, input) {
      $(input).val('');
    });

}



function addToBoard (MesName) {
  var $tr = $('<tr>');
  var $name = $('<td>').addClass('Name').text(MesName.name);
  var $message = $('<td>').addClass('Message').text(MesName.message);
  var $time = $('<td>').addClass('Time').text(MesName.time);
  var $date = $('<td>').addClass('Date').text(MesName.date);
  var $edit = $('<td><p data-placement="top" data-toggle="tooltip" title="Edit"><button data-title="Edit" data-toggle="modal" data-target="#edit" class="btn btn-primary btn-xs editButton"><span class="glyphicon glyphicon-pencil"></span></button></p></td>');
  var $delete = $('<td><p data-placement="top" data-toggle="tooltip" title="Delete"><button data-title="Delete" data-toggle="modal" data-target="#delete" class="btn btn-danger btn-xs deleteButton"><span class="glyphicon glyphicon-trash"></span></button></p></td>');


  

  // var $editTd = $('<td>').addClass('edit text-center');
  // var $editIcon = $('<i>').addClass('fa fa-pencil-square-o fa-lg');
  // $editTd.append($editIcon);
  
  // var $deleteTd = $('<td>').addClass('delete text-center');
  // var $deleteIcon = $('<i>').addClass('fa fa-trash-o fa-lg');
  // $deleteTd.append($deleteIcon);

  $tr.append($name, $message, $date, $time, $edit, $delete);
  return $tr;
}








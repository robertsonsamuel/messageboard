'use strict';

$(document).ready(init);

function init() {
  $('#convert').click(convertMarkdown);
}

function convertMarkdown() {
  var md = $('#input').val();
  $.post('/markdown', {md: md})
  .done(function(data) {
    var $converted = $.parseHTML(data);
    $('#output').empty().append($converted);
  })
  .fail(function(err) {
    console.error(err);
  });
}

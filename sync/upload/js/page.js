$(document).ready(function() {

  /* LOCAL STORAGE */

  if(typeof(Storage) == undefined || typeof(Storage) == "undefined") {
    alert('Error! Dein Browser unterstützt das lokale Speichern nicht.\nBitte benutze die neuste Version von Google Chrome, Safari oder Opera!');
  }

  var settings = {
    'schedule': {
      'spanisch': false,
      'fs2': null,
      'religion': null,
      'wp': null,
      'farben': false
    },
    'dates': {
      'limit': 5
    }
  };

  if(localStorage.settings == null || localStorage.settings == undefined) {
    localStorage.settings = JSON.stringify(settings);
  } else {
    settings = JSON.parse(localStorage.settings);
  }

  var homework = {};

  if(localStorage.homework == null || localStorage.homework == undefined) {
    localStorage.setItem('homework', JSON.stringify(homework));
  } else {
    homework = JSON.parse(localStorage.homework);
  }

  /* SYNC */

  var CODE = md5(new Date().getTime()).substring(0, 16);
  var STORAGE = JSON.stringify(localStorage);
  var DATA = [{0: '', 1: CODE, 2: STORAGE, 3: 'CURRENT_TIMESTAMP'}];

  $.ajax({
    url: '/system/deleteWhereData.php',
    type: 'POST',
    data: {table: 'sync', where: 'time < current_timestamp - interval \'20\' minute;'},
    async: false
  })
  .done(function() {
    $.ajax({
      url: '/admin-area/system/setData.php',
      type: 'POST',
      data: {table: 'sync', data: JSON.stringify(DATA)}
    })
    .done(function() {
      $('div.content div.sync div.body div.code p').text(CODE);
    });
  });


});

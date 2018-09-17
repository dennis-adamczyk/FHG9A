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

  $('div.content div.sync div.body button').click(function(event) {
    var CODE = $('div.content div.sync div.body div.code input').val();

    if(CODE !== '') {
      $.ajax({
        url: '/system/deleteWhereData.php',
        type: 'POST',
        data: {table: 'sync', where: 'time < current_timestamp - interval \'20\' minute;'},
        async: false
      });

      $.ajax({
        url: '/system/getWhereData.php',
        type: 'POST',
        data: {table: 'sync', where: 'code = \'' + CODE + '\''},
        async: false
      })
      .done(function(data) {
        result = JSON.parse(data);
        if(data == null || data == undefined || data == '' || data == 'null') {
          $('div.content div.sync div.body p.error').remove();
          $('div.content div.sync div.body').prepend('<p class="error">Der eingegebene Code wurde nicht gefunden. Prüfen sie ihn auf Tippfehler oder generieren sie einen neuen Code auf dem anderen Gerät!</p>');
        } else {
          storage = JSON.parse(result.storage);
          $.each(storage, function(index, el) {
            localStorage.setItem(index, el);
          });
          $('div.content div.sync div.body').html('<p>Ihr Gerät wurde mithilfe des Codes erfolgreich mit dem anderen Gerät synchronisiert. Alle Einstellungen, etc. sind nun auch auf diesem Gerät verfügbar.</p>')
        }
      });
    } else {
      $('div.content div.sync div.body p.error').remove();
      $('div.content div.sync div.body').prepend('<p class="error">Der eingegebene Code wurde nicht gefunden. Prüfen sie ihn auf Tippfehler oder generieren sie einen neuen Code auf dem anderen Gerät!</p>');
    }

  });


});

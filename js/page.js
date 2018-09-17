$(document).ready(function() {
  var now = new Date();

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

  /* SCHEDULE */

  var schuleEnde = settings.schedule.spanisch ? ['15.25', '13.15', '13.15', '13.15', '15.25'] : ['15.25', '13.15', '13.15', '13.15', '13.15'];

  var displayDay = 0;
  var wochentag = now.getDay() - 1;
  if(wochentag == -1)
    wochentag = 6;
  var days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

  if(wochentag == 5 || wochentag == 6) {
    displayDay = 0;
  } else {
    heuteSchuleEnde = schuleEnde[wochentag].split('.');
    if((now.getHours() > heuteSchuleEnde[0]) || (now.getHours() == heuteSchuleEnde[0] && now.getMinutes() >= heuteSchuleEnde[1])) {
      displayDay = wochentag + 1;
      if(displayDay == 5)
        displayDay = 0;
    } else {
      displayDay = wochentag;
    }
  }

  $('#schedule_day').text(days[displayDay]);

  setSchedule(displayDay, true);

  function setSchedule(day, sync) {
    $('div.content div.card.schedule div.list div.loader').removeAttr('style');
    var stundenAmTag = settings.schedule.spanisch ? [4, 3, 3, 3, 4] : [4, 3, 3, 3, 3];

    var stundenZeiten = ['7.55 - 9.05', '9.15 - 10.25', '10.45 - 11.55', '12.05 - 13.15', '14.15 - 15.25'];

    var promises = [];

    if(!sync) {
      for(i = 0; i <= stundenAmTag[day]; i++) {
        promises.push($.post('/system/getSchedule.php', {'tag': day, 'stunde': i}));
      }

      Promise.all(promises).then(function(resp) {
        resp.forEach(function(el) {
          result = JSON.parse(el);
          if(settings.schedule.fs2 !== null && result.fach == 'Französisch/Latein') {
            if(settings.schedule.fs2 == 'f') {
              result.fach = 'Französisch';
              result.raum = ((result.raum).split('/'))[0];
            } else {
              result.fach = 'Latein';
              result.raum = ((result.raum).split('/'))[1];
            }
          }
          if(settings.schedule.religion !== null && result.fach == 'Religion/Philosophie') {
            if(settings.schedule.religion == 'er') {
              result.fach = 'Religion';
              result.raum = ((result.raum).split('/'))[0];
            } else if(settings.schedule.religion == 'kr') {
              result.fach = 'Religion';
              result.raum = ((result.raum).split('/'))[1];
            } else {
              result.fach = 'Philosophie';
              result.raum = ((result.raum).split('/'))[2];
            }
          }
          if(settings.schedule.wp !== null && result.fach == 'Wahlpflichtfach') {
            if(settings.schedule.wp == 'tech') {
              result.fach = 'Technik';
            } else if(settings.schedule.wp == 'info') {
              result.fach = 'Informatik';
            } else if(settings.schedule.wp == 'wa') {
              result.fach = 'Wirtschaft';
            } else if(settings.schedule.wp == 'ku-d') {
              result.fach = 'Kunst/Design';
            } else if(settings.schedule.wp == 's') {
              result.fach = 'Spanisch';
            } else if(settings.schedule.wp == 'ern') {
              result.fach = 'Ernährungslehre';
            }
          }
          $('div.content div.card.schedule div.list ul').append('<li><p class="lesson">' + (parseInt(result.stunde) + 1) + '. Stunde</p><p class="time">' + stundenZeiten[parseInt(result.stunde)] + '</p><p class="subject">' + result.fach + '</p><p class="room">Raum ' + result.raum + '</p></li>');
        });
        $('div.content div.card.schedule div.list div.loader').css('display', 'none');
      });
    } else {
      for(i = 0; i <= stundenAmTag[day]; i++) {
        $.ajax({
          url: '/system/getSchedule.php',
          type: 'POST',
          data: {'tag': day, 'stunde': i},
          success: function(data) {
            result = JSON.parse(data);
            if(settings.schedule.fs2 !== null && result.fach == 'Französisch/Latein') {
              if(settings.schedule.fs2 == 'f') {
                result.fach = 'Französisch';
                result.raum = ((result.raum).split('/'))[0];
              } else {
                result.fach = 'Latein';
                result.raum = ((result.raum).split('/'))[1];
              }
            }
            if(settings.schedule.religion !== null && result.fach == 'Religion/Philosophie') {
              if(settings.schedule.religion == 'er') {
                result.fach = 'Religion';
                result.raum = ((result.raum).split('/'))[0];
              } else if(settings.schedule.religion == 'kr') {
                result.fach = 'Religion';
                result.raum = ((result.raum).split('/'))[1];
              } else {
                result.fach = 'Philosophie';
                result.raum = ((result.raum).split('/'))[2];
              }
            }
            if(settings.schedule.wp !== null && result.fach == 'Wahlpflichtfach') {
              if(settings.schedule.wp == 'tech') {
                result.fach = 'Technik';
              } else if(settings.schedule.wp == 'info') {
                result.fach = 'Informatik';
              } else if(settings.schedule.wp == 'wa') {
                result.fach = 'Wirtschaft';
              } else if(settings.schedule.wp == 'ku-d') {
                result.fach = 'Kunst/Design';
              } else if(settings.schedule.wp == 's') {
                result.fach = 'Spanisch';
              } else if(settings.schedule.wp == 'ern') {
                result.fach = 'Ernährungslehre';
              }
            }
            $('div.content div.card.schedule div.list ul').append('<li><p class="lesson">' + (parseInt(result.stunde) + 1) + '. Stunde</p><p class="time">' + stundenZeiten[parseInt(result.stunde)] + '</p><p class="subject">' + result.fach + '</p><p class="room">Raum ' + result.raum + '</p></li>');
          },
          async: (sync ? false : true)
        });
      }
      $('div.content div.card.schedule div.list div.loader').css('display', 'none');
    }
  }

  $('div.content div.card.schedule div.top div.right i').click(function(event) {
    displayDay++;
    if(displayDay == 5)
      displayDay = 0;
    $('div.schedule div.list ul').html('');
    $('#schedule_day').text(days[displayDay]);
    setSchedule(displayDay, false);
  });

  $('div.schedule div.top div.left i').click(function(event) {
    displayDay--;
    if(displayDay == -1)
      displayDay = 4;
    $('div.content div.card.schedule div.list ul').html('');
    $('#schedule_day').text(days[displayDay]);
    setSchedule(displayDay, false);
  });

  $('div.content div.card.schedule div.top p').click(function(event) {
    window.location = '/schedule';
  });

  /* HOMEWORK */

  var stundenAmTag = [4, 3, 3, 3, 3];

  var promises = [];
  var faecher = [];
  var hausaufgaben = [];

  for(i = 0; i <= stundenAmTag[displayDay]; i++) {
    promises.push($.post('/system/getSchedule.php', {'tag': displayDay, 'stunde': i}));
  }

  Promise.all(promises).then(function(resp) {
    resp.forEach(function(el) {
      result = JSON.parse(el);
      faecher.push(result.fach);
    });
    faecher.forEach(function(fach, index) {
      var regexLink = /\[link="(.*?)"\](\S.*?\S)\[\/link\]/g;

      $.ajax({
        type: 'POST',
        url: '/system/getHomework.php',
        data: {'fach': fach},
        success: function(data) {
          if(data !== 'null') {
            obj = JSON.parse(data);

            stundenIndex = null;
            $.ajax({
              url: '/system/getWhereData.php',
              type: 'POST',
              data: {table: 'homeworkHistory', where: "datum = '" + obj.datum + "' AND fach = '" + obj.fach + "'"},
              success: function(historyDataRaw) {
                historyData = JSON.parse(historyDataRaw);
                stundenIndex = parseInt(historyData.stunde);
              },
              async: false
            });

            if(obj.fach == 'Französisch/Latein') {
              if(settings.schedule.fs2 == 'f') {
                obj.fach = 'Französisch';
                obj.aufgabe = (obj.aufgabe).split('/')[0];
              } else if(settings.schedule.fs2 == 'l') {
                obj.fach = 'Latein';
                obj.aufgabe = (obj.aufgabe).split('/')[1];
              }
            }
            if(obj.fach == 'Religion/Philosophie') {
              if(settings.schedule.religion == 'er') {
                obj.fach = 'Religion';
                obj.aufgabe = ((obj.aufgabe).split('/'))[0];
              } else if(settings.schedule.religion == 'kr') {
                obj.fach = 'Religion';
                obj.aufgabe = ((obj.aufgabe).split('/'))[1];
              } else if(settings.schedule.religion == 'ppl') {
                obj.fach = 'Philosophie';
                obj.aufgabe = ((obj.aufgabe).split('/'))[2];
              }
            }
            if(obj.aufgabe !== 'X' && obj.aufgabe !== '') {
              hausaufgaben.push(index + '||' + obj.fach + '||' + obj.aufgabe);
              obj.aufgabe = obj.aufgabe.replace(regexLink, '<a href="$1">$2</a>');
              $('div.content div.homework table tbody').append('<tr><td><i class="material-icons checkbox" data-id="' + obj.datum + '" data-stunde="' + stundenIndex + '">check_box_outline_blank</i></td><td>' + (index+1) + '</td><td>' + obj.fach + '</td><td>' + obj.aufgabe + '</td></tr>');
            }
          }
        },
        async: false
      });
    });
    enableCheckboxes();
    setHomeworkChecks();
    if(hausaufgaben.length == 0) {
      $('div.content div.homework').append('<div class="freetime"><i class="material-icons">sentiment_very_satisfied</i><p>Du hast keine Hausaufgaben für den nächsten Schultag auf!<br>Genieß deine freie Zeit!</p></div>');
    }
  });


  function setHomeworkCheck(tag, stunde, state) {
    if(homework[tag] == undefined || homework[tag] == null) {
      homework[tag] = {};
    }
    homework[tag][stunde] = state;
    localStorage.setItem('homework', JSON.stringify(homework));
  }

  function setHomeworkChecks() {
    $.each(homework, function(tag, val) {
      $.each(val, function(stunde, state) {
        if(state)
          $('td i.checkbox[data-id="' + tag + '"][data-stunde="' + stunde + '"]').trigger('click');
      });
    });
  }

  /* DATES */

  $.post('/system/getDates.php', {limit: settings.dates.limit}, function(data) {
    console.log(data);
    result = JSON.parse(data);
    result.forEach(function(el) {
      splitEl = el.split('||');
      date = splitEl[0];
      splitDate = date.split('-');
      value = splitEl[1];
      year = splitDate[0];
      month = splitDate[1];
      day = splitDate[2];
      $('div.content div.dates table tbody').append('<tr><td>' + day + '.' + month + '.' + year + '</td><td>' + value + '</td></tr>');
    });
  });


  /* CHECKBOX */

  function enableCheckboxes() {
    $('i.checkbox').click(function(event) {
      if($(this).text() == 'check_box_outline_blank') {
        $(this).text('check_box');
        $(this).addClass('active');
        if($(this).parent().is('th')) {
          $('i.checkbox').each(function(index, el) {
            $(this).text('check_box');
            $(this).addClass('active');
            setHomeworkCheck($(el).data('id'), $(el).data('stunde'), true);
          });
        } else {
          setHomeworkCheck($(this).data('id'), $(this).data('stunde'), true);
          allSelected = true;
          $('i.checkbox').each(function(index, el) {
            if(!$(this).parent().is('th')) {
              if($(this).text() == 'check_box_outline_blank') {
                allSelected = false;
              }
            }
          });
          if(allSelected == true) {
            $('th i.checkbox').text('check_box');
            $('th i.checkbox').addClass('active');
          }
        }
      } else {
        $(this).text('check_box_outline_blank');
        $(this).removeClass('active');
        if($(this).parent('th').length == 0)
          setHomeworkCheck($(this).data('id'), $(this).data('stunde'), false);
        if($(this).parent().is('th')) {
          $('i.checkbox').each(function(index, el) {
            $(this).text('check_box_outline_blank');
            $(this).removeClass('active');
          });
        } else if($('th i.checkbox').text() == 'check_box') {
            $('th i.checkbox').text('check_box_outline_blank');
            $('th i.checkbox').removeClass('active');
            if($(el).parent('th').length == 0)
              setHomeworkCheck($(el).data('id'), $(el).data('stunde'), false);
        }
      }
    });
  }

});

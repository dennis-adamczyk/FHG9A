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

  /* ADD DATA FUNCTS */

  Date.prototype.getWeek = function() {
    // var onejan = new Date(this.getFullYear(), 0, 1);
    // return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);

    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
  };

  Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
  };

  Date.prototype.toMySQLFormat = function(days) {
    var dat = new Date(this.valueOf());
    return dat.getFullYear() + '-' + ('0' + (dat.getMonth() + 1)).slice(-2) + '-' + ("0" + dat.getDate()).slice(-2);
  };

  Date.prototype.toFullFormat = function(days) {
    var dat = new Date(this.valueOf());
    var monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'Novermber', 'Dezember'];
    return ("0" + dat.getDate()).slice(-2) + '. ' + monate[dat.getMonth()] + ' ' + dat.getFullYear();
  };

  /* MOBILE */

  var mobile = $(window).width() < 800;

  $(window).resize(function(event) {
    mobile = $(window).width() < 800;
    optimizeStyle();
  });

  function optimizeStyle() {

  }

  /* NEXT / PREV */

  var loadedWeek = new Date().getWeek();

  $('div.content div.homework div.top div.left i').click(function(event) {
    setTimeout(function() {
      loadHomework(--loadedWeek);
    }, 20);
  });

  $('div.content div.homework div.top div.right i').click(function(event) {
    setTimeout(function() {
      loadHomework(++loadedWeek);
    }, 20);
  });

  $('div.content div.homework div.top p').click(function(event) {
    loadedWeek = new Date().getWeek();
    loadHomework(loadedWeek);
  });

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
      return;
    }

    if(xDown < 50) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff < -12 ) {
        loadHomework(--loadedWeek);
      }
      if ( xDiff > 11 ) {
        loadHomework(++loadedWeek);
      }
    }

    xDown = null;
    yDown = null;
  }

  /* LOAD HOMEWORK */

  loadHomework(loadedWeek);
  optimizeStyle();

  function loadHomework(woche) {
    var regexLink = /\[link="(.*?)"\](\S.*?\S)\[\/link\]/g;

    $('div.content div.homework div.body').html('');
    $('div.content div.homework div.top p').text('Woche ' + woche);
    var tage = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];
    var wochenBeginn = new Date(new Date().getFullYear(), 0, (1 + (woche - 1) * 7));
    for(var day = 0; day < 5; day++) {
      var dayDate = wochenBeginn;
      dayDate = dayDate.addDays(day);
      if(!mobile) {
        $.ajax({
          url: '/system/getHomeworkHistory.php',
          type: 'POST',
          data: {datum: dayDate.toMySQLFormat()},
          success: function(data) {
            result = JSON.parse(data);

            var homeworks = [];

            result.forEach(function(homework, index) {
              split = homework.split('||');
              stunde = parseInt(split[0]);
              fach = split[1];
              kurz = split[2];
              aufgabe = split[3];

              if((fach !== 'Spanisch') || (settings.schedule.spanisch == true && fach == 'Spanisch')) {
                if(settings.schedule.fs2 !== null && fach == 'Französisch/Latein') {
                  if(settings.schedule.fs2 == 'f') {
                    fach = 'Französisch';
                    aufgabe = aufgabe.split('/')[0];
                  } else {
                    fach = 'Latein';
                    aufgabe = aufgabe.split('/')[1];
                  }
                }
                if(settings.schedule.religion !== null && fach == 'Religion/Philosophie') {
                  if(settings.schedule.religion == 'er') {
                    fach = 'Religion';
                    aufgabe = aufgabe.split('/')[0];
                  } else if(settings.schedule.religion == 'kr') {
                    fach = 'Religion';
                    aufgabe = aufgabe.split('/')[1];
                  } else {
                    fach = 'Philosophie';
                    aufgabe = aufgabe.split('/')[2];
                  }
                }
                if(fach == 'Wahlpflichtfach') {
                  aufgabe = '[Keine Angabe]';
                }
                if(settings.schedule.wp !== null && fach == 'Wahlpflichtfach') {
                  if(settings.schedule.wp == 'tech') {
                    fach = 'Technik';
                  } else if(settings.schedule.wp == 'info') {
                    fach = 'Informatik';
                  } else if(settings.schedule.wp == 'wa') {
                    fach = 'Wirtschaft';
                  } else if(settings.schedule.wp == 'ku-d') {
                    fach = 'Kunst/Design';
                  } else if(settings.schedule.wp == 's') {
                    fach = 'Spanisch';
                  } else if(settings.schedule.wp == 'ern') {
                    fach = 'Ernährungslehre';
                  }
                }
                aufgabe = aufgabe.replace(regexLink, '<a href="$1">$2</a>');
                if (aufgabe !== '')
                  homeworks.push('<tr><td>' + (stunde + 1) + '</td><td>' + fach + '</td><td>' + aufgabe + '</td><td><i class="material-icons checkbox" data-id="' + dayDate.toMySQLFormat() + '" data-stunde="' + stunde + '">check_box_outline_blank</i></td></tr>');
              }
            });

            homeworks.sort();
            terminListe = [];
            $.ajax({
              url: '/system/getDate.php',
              type: 'POST',
              data: {datum: dayDate.toMySQLFormat()},
              success: function(termineRaw) {
                termine = JSON.parse(termineRaw);
                if(termine.length !== 0) {
                  terminListe = termine;
                }
              },
              async: false
            });

            if(homeworks.length == 0) {
              $('div.content div.homework div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + (terminListe == '' ?  '' : ' <span class="termin">[' + (terminListe).join(', ') + ']</span>') + '</p><table><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th><th><i class="material-icons checkbox" data-id="' + dayDate.toMySQLFormat() + '">check_box_outline_blank</i></th></tr></thead><tbody></tbody></table><div class="error"><p><i class="material-icons">info_outline</i>Keine Aufzeichnungen für diesen Tag vorhanden</p></div>');
            } else {
              $('div.content div.homework div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + (terminListe == '' ?  '' : ' <span class="termin">[' + (terminListe).join(', ') + ']</span>') + '</p><table><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th><th><i class="material-icons checkbox" data-id="' + dayDate.toMySQLFormat() + '">check_box_outline_blank</i></th></tr></thead><tbody>' + homeworks.join('') + '</tbody></table>');
            }
          },
          async: false
        });
      } else {
        $.ajax({
          url: '/system/getHomeworkHistory.php',
          type: 'POST',
          data: {datum: dayDate.toMySQLFormat()},
          success: function(data) {
            result = JSON.parse(data);

            var homeworks = [];

            result.forEach(function(homework, index) {
              split = homework.split('||');
              stunde = parseInt(split[0]);
              fach = split[1];
              kurz = split[2];
              aufgabe = split[3];

              if((fach !== 'Spanisch') || (settings.schedule.spanisch == true && fach == 'Spanisch')) {
                if(settings.schedule.fs2 !== null && fach == 'Französisch/Latein') {
                  if(settings.schedule.fs2 == 'f') {
                    kurz = 'F';
                    aufgabe = aufgabe.split('/')[0];
                  } else {
                    kurz = 'L';
                    aufgabe = aufgabe.split('/')[1];
                  }
                }
                if(settings.schedule.religion !== null && fach == 'Religion/Philosophie') {
                  if(settings.schedule.religion == 'er') {
                    kurz = 'ER';
                    aufgabe = aufgabe.split('/')[0];
                  } else if(settings.schedule.religion == 'kr') {
                    kurz = 'KR';
                    aufgabe = aufgabe.split('/')[1];
                  } else {
                    kurz = 'PPL';
                    aufgabe = aufgabe.split('/')[2];
                  }
                }
                if(fach == 'Wahlpflichtfach') {
                  aufgabe = '[Keine Angabe]';
                }
                if(settings.schedule.wp !== null && fach == 'Wahlpflichtfach') {
                  if(settings.schedule.wp == 'tech') {
                    kurz = 'Tech';
                  } else if(settings.schedule.wp == 'info') {
                    kurz = 'Info';
                  } else if(settings.schedule.wp == 'wa') {
                    kurz = 'WA';
                  } else if(settings.schedule.wp == 'ku-d') {
                    kurz = 'Ku/D';
                  } else if(settings.schedule.wp == 's') {
                    kurz = 'S';
                  } else if(settings.schedule.wp == 'ern') {
                    kurz = 'Ern';
                  }
                }
                aufgabe = aufgabe.replace(regexLink, '<a href="$1">$2</a>');
                if(aufgabe !== '')
                  homeworks.push('<tr><td>' + (stunde + 1) + '</td><td>' + kurz + '</td><td>' + aufgabe + '</td><td><i class="material-icons checkbox" data-id="' + dayDate.toMySQLFormat() + '" data-stunde="' + stunde + '">check_box_outline_blank</i></td></tr>');
              }
            });

            homeworks.sort();
            terminListe = [];
            $.ajax({
              url: '/system/getDate.php',
              type: 'POST',
              data: {datum: dayDate.toMySQLFormat()},
              success: function(termineRaw) {
                termine = JSON.parse(termineRaw);
                if(termine.length !== 0) {
                  terminListe = termine;
                }
              },
              async: false
            });

            if(homeworks.length == 0) {
              $('div.content div.homework div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + (terminListe == '' ?  '' : ' <span class="termin">[' + (terminListe).join(', ') + ']</span>') + '</p><table><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th><th><i class="material-icons checkbox" data-id="' + dayDate.toMySQLFormat() + '">check_box_outline_blank</i></th></tr></thead><tbody></tbody></table><div class="error"><p><i class="material-icons">info_outline</i>Keine Aufzeichnungen für diesen Tag vorhanden</p></div>');
            } else {
              $('div.content div.homework div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + (terminListe == '' ?  '' : ' <span class="termin">[' + (terminListe).join(', ') + ']</span>') + '</p><table><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th><th><i class="material-icons checkbox" data-id="' + dayDate.toMySQLFormat() + '">check_box_outline_blank</i></th></tr></thead><tbody>' + homeworks.join('') + '</tbody></table>');
            }
          },
          async: false
        });
      }
    }
    enableCheckboxes();
    setHomeworkChecks();
    if(woche == new Date().getWeek()) {
      $('div.content div.homework div.body p.day:eq(' + (new Date().getDay() - 1) + ')').addClass('today');
    }
  }

  /* CHECKBOXES */

  function enableCheckboxes() {
    $('i.checkbox').click(function(event) {
      if($(this).text() == 'check_box_outline_blank') {
        $(this).text('check_box');
        $(this).addClass('active');
        if($(this).parent().is('th')) {
          $('i.checkbox[data-id=' + $(this).data('id') + ']').each(function(index, el) {
            if($(el).parent('td').length !== 0) {
              $(el).text('check_box');
              $(el).addClass('active');
              setHomeworkCheck($(el).data('id'), $(el).data('stunde'), true);
            }
          });
        } else {
          setHomeworkCheck($(this).data('id'), $(this).data('stunde'), true);
          allSelected = true;
          $('i.checkbox[data-id=' + $(this).data('id') + ']').each(function(index, el) {
            if(!$(this).parent().is('th')) {
              if($(this).text() == 'check_box_outline_blank') {
                allSelected = false;
              }
            }
          });
          if(allSelected == true) {
            $('th i.checkbox[data-id=' + $(this).data('id') + ']').text('check_box');
            $('th i.checkbox[data-id=' + $(this).data('id') + ']').addClass('active');
          }
        }
      } else {
        $(this).text('check_box_outline_blank');
        $(this).removeClass('active');
        if($(this).parent('th').length == 0)
          setHomeworkCheck($(this).data('id'), $(this).data('stunde'), false);
        if($(this).parent().is('th')) {
          $('i.checkbox[data-id=' + $(this).data('id') + ']').each(function(index, el) {
            $(this).text('check_box_outline_blank');
            $(this).removeClass('active');
            if($(el).parent('th').length == 0)
              setHomeworkCheck($(el).data('id'), $(el).data('stunde'), false);
          });
        } else if($('th i.checkbox[data-id=' + $(this).data('id') + ']').text() == 'check_box') {
            $('th i.checkbox[data-id=' + $(this).data('id') + ']').text('check_box_outline_blank');
            $('th i.checkbox[data-id=' + $(this).data('id') + ']').removeClass('active');
        }
      }
    });
  }

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

});

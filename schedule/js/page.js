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

  /* VIEW */

  var dayView = ($(location).attr('search').toLowerCase() == '?view=day');

  /* MOBILE */

  var mobile = $(window).width() < 800;

  $(window).resize(function(event) {
    mobile = $(window).width() < 800;
    optimizeStyle();
  });

  function optimizeStyle() {
    var wochentag = new Date().getDay();
    var now = new Date();
    var times = ['7.55-9.05', '9.15-10.25', '10.45-11.55', '12.05-13.15', '14.15-15.25'];
    if(!dayView) {
      if(mobile) {
        $('div.content div.schedule div.body table thead tr th').each(function(index, el)  {
          $(this).text(($(this).text()).substring(0, 2));
        });
        $('div.content div.schedule div.body table tbody tr th').each(function(index, el)  {
          $(this).text(($(this).text()).split(' - ')[0]);
        });
      } else {
        $('div.content div.schedule div.body table thead tr th').each(function(index, el)  {
          if(index > 0) {
            var days = ['Montag', 'Dienstag', 'Mittwoch', 'Donnertag', 'Freitag'];
            $(this).text(days[index-1]);
          }
        });
        $('div.content div.schedule div.body table tbody tr th').each(function(index, el)  {
          var stundenZeiten = ['7.55 - 9.05', '9.15 - 10.25', '10.45 - 11.55', '12.05 - 13.15', '14.15 - 15.25'];
          $(this).text(stundenZeiten[index]);
        });
      }

      times.forEach(function(data, index) {
        times = data.split('-');
        times1 = times[0].split('.');
        hour1 = parseInt(times1[0]);
        minute1 = parseInt(times1[1]);
        var time1 = new Date();
        time1.setHours(hour1, minute1, 0);

        times2 = times[1].split('.');
        hour2 = parseInt(times2[0]);
        minute2 = parseInt(times2[1]);
        var time2 = new Date();
        time2.setHours(hour2, minute2, 0);

        if(time1.getTime() < now.getTime() && now.getTime() < time2.getTime()) {
          if(new Date().getDay() !== 6 && new Date().getDay() !== 0)
            $('div.content div.schedule:not(.dayView) div.body table tbody tr:eq(' + index + ')').addClass('now');
        }
      });
      if(wochentag !== 6) {
        $('div.content div.schedule div.body table thead tr th:eq(' + wochentag + ')').addClass('today');
      }
    } else {
      if(mobile) {
        $('div.content div.schedule.dayView div.body table tbody tr td:nth-child(2)').each(function(index, el) {
          $(this).html(($(this).html()).replace(' ', '<br>').replace(' ', '<br>'));
          $(this).css('text-align', 'center');
          $(this).css('width', '30px');
          $('div.content div.schedule.dayView div.body table thead tr th:nth-child(2)').css('text-align', 'center');
          $('div.content div.schedule.dayView div.body table thead tr th:nth-child(2)').css('width', '30px');
        });
      } else {
        $('div.content div.schedule.dayView div.body table tbody tr td:nth-child(2)').each(function(index, el) {
          $(this).html(($(this).html()).replace('<br>', ' ').replace('<br>', ' '));
          $(this).removeAttr('style');
          $('div.content div.schedule.dayView div.body table thead tr th:nth-child(2)').removeAttr('style');
        });
      }

      times.forEach(function(data, index) {
        times = data.split('-');
        times1 = times[0].split('.');
        hour1 = parseInt(times1[0]);
        minute1 = parseInt(times1[1]);
        var time1 = new Date();
        time1.setHours(hour1, minute1, 0);

        times2 = times[1].split('.');
        hour2 = parseInt(times2[0]);
        minute2 = parseInt(times2[1]);
        var time2 = new Date();
        time2.setHours(hour2, minute2, 0);

        if(time1.getTime() < now.getTime() && now.getTime() < time2.getTime()) {
          $('div.content div.schedule.dayView div.body table:eq(' + (wochentag-1) + ') tbody tr:eq(' + index + ')').addClass('now');
        }
      });
      if((wochentag-1) !== 5 && (wochentag-1) !== -1) {
        $('div.content div.schedule.dayView div.body p.day:eq(' + (wochentag-1) + ')').addClass('today');
      }
    }
  }

  /* LOAD SCHEDULE */
  loadSchedule();
  optimizeStyle();

  function loadSchedule() {
    if(!dayView) {
      for (var row = 0; row < 5; row++) {
        lessons = [];
        $.ajax({
          url: '/system/getScheduleRow.php',
          type: 'POST',
          data: {'stunde': row},
          success: function(data) {
            result = JSON.parse(data);
            lessons = result;
          },
          async: false
        });
        lessons.forEach(function(data, index) {
          var split = data.split('||');
          var tag = split[0];
          var fach = split[1];
          var kurz = split[2];
          var raum = split[3];
          var lehrer = split[4].split('|')[0];
          var lehrerKurz = split[4].split('|')[1];
          var farbe = split[5];
          if(farbe == '#FFFFFF')
            farbe = '#FFFFFF; color: rgba(0, 0, 0, 0.87)';

          if(mobile) {
            if((fach !== 'Spanisch') || (settings.schedule.spanisch == true && fach == 'Spanisch')) {
              if(settings.schedule.fs2 !== null && fach == 'Französisch/Latein') {
                if(settings.schedule.fs2 == 'f') {
                  kurz = 'F';
                  raum = ((raum).split('/'))[0];
                  lehrerKurz = ((lehrerKurz).split('/'))[0];
                } else {
                  kurz = 'L';
                  raum = ((raum).split('/'))[1];
                  lehrerKurz = ((lehrerKurz).split('/'))[1];
                }
              }
              if(settings.schedule.religion !== null && fach == 'Religion/Philosophie') {
                if(settings.schedule.religion == 'er') {
                  kurz = 'ER';
                  raum = ((raum).split('/'))[0];
                  lehrerKurz = ((lehrerKurz).split('/'))[0];
                } else if(settings.schedule.religion == 'kr') {
                  kurz = 'KR';
                  raum = ((raum).split('/'))[1];
                  lehrerKurz = ((lehrerKurz).split('/'))[1];
                } else {
                  kurz = 'PPL';
                  raum = ((raum).split('/'))[2];
                  lehrerKurz = ((lehrerKurz).split('/'))[2];
                }
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
              $('div.content div.schedule div.body table tbody tr:eq(' + row + ') td:eq(' + tag + ')').append('<div class="lesson"' + (settings.schedule.farben ? ' style="background-color: ' + farbe + '"' : '') + '><div><p class="fach">' + kurz + '</p><p class="lehrer">' + lehrerKurz + '</p><p class="raum">R<span style="padding-left: 4px">' + raum + '</span></p></div></div>');
            }
          } else {
            if((fach !== 'Spanisch') || (settings.schedule.spanisch == true && fach == 'Spanisch')) {
              if(settings.schedule.fs2 !== null && fach == 'Französisch/Latein') {
                if(settings.schedule.fs2 == 'f') {
                  fach = 'Französisch';
                  raum = ((raum).split('/'))[0];
                  lehrer = ((lehrer).split('/'))[0];
                } else {
                  fach = 'Latein';
                  raum = ((raum).split('/'))[1];
                  lehrer = ((lehrer).split('/'))[1];
                }
              }
              if(settings.schedule.religion !== null && fach == 'Religion/Philosophie') {
                if(settings.schedule.religion == 'er') {
                  fach = 'Religion';
                  raum = ((raum).split('/'))[0];
                  lehrer = ((lehrer).split('/'))[0];
                } else if(settings.schedule.religion == 'kr') {
                  fach = 'Religion';
                  raum = ((raum).split('/'))[1];
                  lehrer = ((lehrer).split('/'))[1];
                } else {
                  fach = 'Philosophie';
                  raum = ((raum).split('/'))[2];
                  lehrer = ((lehrer).split('/'))[2];
                }
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

              $('div.content div.schedule div.body table tbody tr:eq(' + row + ') td:eq(' + tag + ')').append('<div class="lesson"' + (settings.schedule.farben ? ' style="background-color: ' + farbe + '"' : '') + '"><div><p class="fach">' + fach + '</p><p class="lehrer">' + lehrer + '</p><p class="raum">Raum ' + raum + '</p></div></div>');
            }
          }
        });
      }
      $('div.content div.schedule div.body table tbody tr td div.lesson').click(function(event) {
        tag = $(this).parent('td').index() - 1;
        stunde = $(this).parent('td').parent('tr').index();
        var $overlay = $('div.popup-overlay');
        $overlay.css('display', 'block');
        var $popup = $('div.popup');
        $popup.css('display', 'block');
        setTimeout(function() {
          $overlay.css('opacity', '1');
        }, 10);
        $.ajax({
          url: '/system/getSchedule.php',
          type: 'POST',
          data: {'tag': tag, 'stunde': stunde},
          success: function(data) {
            result = JSON.parse(data);
            result.lehrerKurz = result.lehrer.split('|')[1];
            result.lehrer = result.lehrer.split('|')[0];
            if(settings.schedule.fs2 !== null && result.fach == 'Französisch/Latein') {
              if(settings.schedule.fs2 == 'f') {
                result.fach = 'Französisch';
                result.kurz = 'F';
                result.raum = ((result.raum).split('/'))[0];
                result.lehrer = ((result.lehrer).split('/'))[0];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[0]);
              } else {
                result.fach = 'Latein';
                result.kurz = 'L';
                result.raum = ((result.raum).split('/'))[1];
                result.lehrer = ((result.lehrer).split('/'))[1];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[1]);
              }
            }
            if(settings.schedule.religion !== null && result.fach == 'Religion/Philosophie') {
              if(settings.schedule.religion == 'er') {
                result.fach = 'Religion';
                result.kurz = 'ER';
                result.raum = ((result.raum).split('/'))[0];
                result.lehrer = ((result.lehrer).split('/'))[0];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[0]);
              } else if(settings.schedule.religion == 'kr') {
                result.fach = 'Religion';
                result.kurz = 'KR';
                result.raum = ((result.raum).split('/'))[1];
                result.lehrer = ((result.lehrer).split('/'))[1];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[1]);
              } else {
                result.fach = 'Philosophie';
                result.kurz = 'PPL';
                result.raum = ((result.raum).split('/'))[2];
                result.lehrer = ((result.lehrer).split('/'))[2];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[2]);
              }
            }
            if(settings.schedule.wp !== null && result.fach == 'Wahlpflichtfach') {
              if(settings.schedule.wp == 'tech') {
                result.fach = 'Technik';
                result.kurz = 'Tech';
              } else if(settings.schedule.wp == 'info') {
                result.fach = 'Informatik';
                result.kurz = 'Info';
              } else if(settings.schedule.wp == 'wa') {
                result.fach = 'Wirtschaft';
                result.kurz = 'WA';
              } else if(settings.schedule.wp == 'ku-d') {
                result.fach = 'Kunst/Design';
                result.kurz = 'Ku/D';
              } else if(settings.schedule.wp == 's') {
                result.fach = 'Spanisch';
                result.kurz = 'S';
              } else if(settings.schedule.wp == 'ern') {
                result.fach = 'Ernährungslehre';
                result.kurz = 'Ern';
              }
            }
            $popup.html('');
            $popup.append('<p class="title">' + result.fach + '</p><div class="body"><div class="group"><p class="key">Abkürzung</p><p class="value">' + result.kurz + '</p></div>' +
              '<div class="group"><p class="key">Raum</p><p class="value">' + result.raum + '</p></div><div class="group"><p class="key">Lehrer</p><p class="value">' + result.lehrer + '</p></div>' +
              '<div class="group"><p class="key">Kürzel</p><p class="value">' + result.lehrerKurz + '</p></div><div class="group"><p class="key">Farbe</p><p class="value color" style="background-color: ' + result.farbe + '">.</p></div></div>' +
              '<div class="buttons"><div class="ok"><p>OK</p></div></div>');

            $popup.css('opacity', '1');
            $('div.popup div.buttons div.ok').click(function(event) {
              var $overlay = $('div.popup-overlay');
              var $popup = $('div.popup');
              $overlay.css('opacity', '0');
              $popup.css('opacity', '0');
              setTimeout(function() {
                $overlay.removeAttr('style');
                $popup.removeAttr('style');
              }, 120);
            });
            Waves.attach('div.popup div.buttons div.ok');
          }
        });
      });
      $('div.popup-overlay').click(function(event) {
        var $overlay = $(this);
        var $popup = $('div.popup');
        $overlay.css('opacity', '0');
        $popup.css('opacity', '0');
        setTimeout(function() {
          $overlay.removeAttr('style');
          $popup.removeAttr('style');
        }, 120);
      });
    } else{
      for (var day = 0; day < 5; day++) {
        lessons = [];
        $.ajax({
          url: '/system/getScheduleColumn.php',
          type: 'POST',
          data: {'tag': day},
          success: function(data) {
            result = JSON.parse(data);
            lessons = result;
          },
          async: false
        });
        lessons.forEach(function(data, index) {
          var split = data.split('||');
          var stunde = parseInt(split[0]);
          var fach = split[1];
          var kurz = split[2];
          var raum = split[3];
          var lehrer = split[4].split('|')[0];
          var lehrerKurz = split[4].split('|')[1];
          var farbe = split[5];
          if(farbe == '#FFFFFF')
            farbe = '#FFFFFF; color: rgba(0, 0, 0, 0.87)';

          if(mobile) {
            if((fach !== 'Spanisch') || (settings.schedule.spanisch == true && fach == 'Spanisch')) {
              if(settings.schedule.fs2 !== null && fach == 'Französisch/Latein') {
                if(settings.schedule.fs2 == 'f') {
                  kurz = 'F';
                  raum = ((raum).split('/'))[0];
                  lehrerKurz = ((lehrerKurz).split('/'))[0];
                } else {
                  kurz = 'L';
                  raum = ((raum).split('/'))[1];
                  lehrerKurz = ((lehrerKurz).split('/'))[1];
                }
              }
              if(settings.schedule.religion !== null && fach == 'Religion/Philosophie') {
                if(settings.schedule.religion == 'er') {
                  kurz = 'ER';
                  raum = ((raum).split('/'))[0];
                  lehrerKurz = ((lehrerKurz).split('/'))[0];
                } else if(settings.schedule.religion == 'kr') {
                  kurz = 'KR';
                  raum = ((raum).split('/'))[1];
                  lehrerKurz = ((lehrerKurz).split('/'))[1];
                } else {
                  kurz = 'PPL';
                  raum = ((raum).split('/'))[2];
                  lehrerKurz = ((lehrerKurz).split('/'))[2];
                }
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
              stundenZeiten = ['7.55 - 9.05', '9.15 - 10.25', '10.45 - 11.55', '12.05 - 13.15', '14.15 - 15.25'];
              $('div.content div.schedule.dayView div.body table:eq(' + day + ') tbody').append('<tr><td>' + (stunde+1) + '</td><td>' + stundenZeiten[stunde] + '</td><td><div class="lesson"' + (settings.schedule.farben ? ' style="background-color: ' + farbe + '"' : '') + '><p class="fach">' + kurz + '</p><p class="lehrer">' + lehrerKurz + '</p><p class="raum">R<span style="padding-left: 4px">' + raum + '</span></p></div></td></tr>');
            }
          } else {
            if((fach !== 'Spanisch') || (settings.schedule.spanisch == true && fach == 'Spanisch')) {
              if(settings.schedule.fs2 !== null && fach == 'Französisch/Latein') {
                if(settings.schedule.fs2 == 'f') {
                  fach = 'Französisch';
                  raum = ((raum).split('/'))[0];
                  lehrer = ((lehrer).split('/'))[0];
                } else {
                  fach = 'Latein';
                  raum = ((raum).split('/'))[1];
                  lehrer = ((lehrer).split('/'))[1];
                }
              }
              if(settings.schedule.religion !== null && fach == 'Religion/Philosophie') {
                if(settings.schedule.religion == 'er') {
                  fach = 'Religion';
                  raum = ((raum).split('/'))[0];
                  lehrer = ((lehrer).split('/'))[0];
                } else if(settings.schedule.religion == 'kr') {
                  fach = 'Religion';
                  raum = ((raum).split('/'))[1];
                  lehrer = ((lehrer).split('/'))[1];
                } else {
                  fach = 'Philosophie';
                  raum = ((raum).split('/'))[2];
                  lehrer = ((lehrer).split('/'))[2];
                }
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
              stundenZeiten = ['7.55 - 9.05', '9.15 - 10.25', '10.45 - 11.55', '12.05 - 13.15', '14.15 - 15.25'];
              $('div.content div.schedule.dayView div.body table:eq(' + day + ') tbody').append('<tr><td>' + (stunde+1) + '</td><td>' + stundenZeiten[stunde] + '</td><td><div class="lesson"' + (settings.schedule.farben ? ' style="background-color: ' + farbe + '"' : '') + '><p class="fach">' + fach + '</p><p class="lehrer">' + lehrer + '</p><p class="raum">Raum ' + raum + '</span></p></div></td></tr>');
            }
          }
        });
      }
      $('div.content div.schedule.dayView div.body table tbody tr td div.lesson').click(function(event) {
        tag = $(this).parent().parent().parent().parent().index('table');
        stunde = $(this).parent('td').parent('tr').index();
        var $overlay = $('div.popup-overlay');
        $overlay.css('display', 'block');
        var $popup = $('div.popup');
        $popup.css('display', 'block');
        setTimeout(function() {
          $overlay.css('opacity', '1');
        }, 10);
        $.ajax({
          url: '/system/getSchedule.php',
          type: 'POST',
          data: {'tag': tag, 'stunde': stunde},
          success: function(data) {
            result = JSON.parse(data);
            result.lehrerKurz = result.lehrer.split('|')[1];
            result.lehrer = result.lehrer.split('|')[0];
            if(settings.schedule.fs2 !== null && result.fach == 'Französisch/Latein') {
              if(settings.schedule.fs2 == 'f') {
                result.fach = 'Französisch';
                result.kurz = 'F';
                result.raum = ((result.raum).split('/'))[0];
                result.lehrer = ((result.lehrer).split('/'))[0];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[0]);
              } else {
                result.fach = 'Latein';
                result.kurz = 'L';
                result.raum = ((result.raum).split('/'))[1];
                result.lehrer = ((result.lehrer).split('/'))[1];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[1]);
              }
            }
            if(settings.schedule.religion !== null && result.fach == 'Religion/Philosophie') {
              if(settings.schedule.religion == 'er') {
                result.fach = 'Religion';
                result.kurz = 'ER';
                result.raum = ((result.raum).split('/'))[0];
                result.lehrer = ((result.lehrer).split('/'))[0];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[0]);
              } else if(settings.schedule.religion == 'kr') {
                result.fach = 'Religion';
                result.kurz = 'KR';
                result.raum = ((result.raum).split('/'))[1];
                result.lehrer = ((result.lehrer).split('/'))[1];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[1]);
              } else {
                result.fach = 'Philosophie';
                result.kurz = 'PPL';
                result.raum = ((result.raum).split('/'))[2];
                result.lehrer = ((result.lehrer).split('/'))[2];
                result.lehrerKurz = ((result.lehrerKurz).split('/')[2]);
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
            $popup.html('');
            $popup.append('<p class="title">' + result.fach + '</p><div class="body"><div class="group"><p class="key">Abkürzung</p><p class="value">' + result.kurz + '</p></div>' +
              '<div class="group"><p class="key">Raum</p><p class="value">' + result.raum + '</p></div><div class="group"><p class="key">Lehrer</p><p class="value">' + result.lehrer + '</p></div>' +
              '<div class="group"><p class="key">Kürzel</p><p class="value">' + result.lehrerKurz + '</p></div><div class="group"><p class="key">Farbe</p><p class="value color" style="background-color: ' + result.farbe + '">.</p></div></div>' +
              '<div class="buttons"><div class="ok"><p>OK</p></div></div>');

            $popup.css('opacity', '1');
            $('div.popup div.buttons div.ok').click(function(event) {
              var $overlay = $('div.popup-overlay');
              var $popup = $('div.popup');
              $overlay.css('opacity', '0');
              $popup.css('opacity', '0');
              setTimeout(function() {
                $overlay.removeAttr('style');
                $popup.removeAttr('style');
              }, 120);
            });
            Waves.attach('div.popup div.buttons div.ok');
          }
        });
      });
      $('div.popup-overlay').click(function(event) {
        var $overlay = $(this);
        var $popup = $('div.popup');
        $overlay.css('opacity', '0');
        $popup.css('opacity', '0');
        setTimeout(function() {
          $overlay.removeAttr('style');
          $popup.removeAttr('style');
        }, 120);
      });
    }

  }

});

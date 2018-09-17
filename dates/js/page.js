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

  /* ADD DATA FUNCTS */

  Date.prototype.getWeek = function() {
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

  Date.prototype.addMonths = function(months) {
    var dat = new Date(this.valueOf());
    dat.setMonth(dat.getMonth() + months);
    return dat;
  };

  Date.prototype.remMonths = function(months) {
    var dat = new Date(this.valueOf());
    dat.setMonth(dat.getMonth() - months);
    return dat;
  };

  Date.prototype.toMySQLFormat = function() {
    var dat = new Date(this.valueOf());
    return dat.getFullYear() + '-' + ('0' + (dat.getMonth() + 1)).slice(-2) + '-' + ("0" + dat.getDate()).slice(-2);
  };

  Date.prototype.toFullFormat = function() {
    var dat = new Date(this.valueOf());
    var monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'Novermber', 'Dezember'];
    return ("0" + dat.getDate()).slice(-2) + '. ' + monate[dat.getMonth()] + ' ' + dat.getFullYear();
  };

  Date.prototype.getMonthName = function() {
    var dat = new Date(this.valueOf());
    var monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'Novermber', 'Dezember'];
    return monate[dat.getMonth()];
  };

  Date.prototype.getDaysInMonth = function() {
    var dat = new Date(this.valueOf());
    return new Date(dat.getFullYear(), (dat.getMonth() + 1), 0).getDate();
  };

  Date.prototype.getDayNumber = function() {
    var dat = new Date(this.valueOf());
    day = dat.getDay() - 1;
    if(day == -1)
      day = 6;
    return day;
  };

  Date.prototype.getWeeksInMonth = function() {
    var dat = new Date(this.valueOf());
    var year = dat.getFullYear();
    var month_number = dat.getMonth();
    var firstOfMonth = new Date(year, month_number, 1);
    var day = firstOfMonth.getDay() || 6;
    day = day === 1 ? 0 : day;
    if (day) { day--; }
    var diff = 7 - day;
    var lastOfMonth = new Date(year, month_number + 1, 0);
    var lastDate = lastOfMonth.getDate();
    if (lastOfMonth.getDay() === 1) {
    	diff--;
    }
    var result = Math.ceil((lastDate - diff) / 7);
    return result + 1;
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

  var loadedMonth = new Date();

  $('div.content div.dates div.top div.left i').click(function(event) {
    setTimeout(function() {
      loadedMonth = loadedMonth.remMonths(1);
      loadDates(loadedMonth);
    }, 20);
  });

  $('div.content div.dates div.top div.right i').click(function(event) {
    setTimeout(function() {
      loadedMonth = loadedMonth.addMonths(1);
      loadDates(loadedMonth);
    }, 20);
  });

  $('div.content div.dates div.top p').click(function(event) {
    loadedMonth = new Date();
    loadDates(loadedMonth);
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
        loadedMonth = loadedMonth.remMonths(1);
        loadDates(loadedMonth);
      }
      if ( xDiff > 11 ) {
        loadedMonth = loadedMonth.addMonths(1);
        loadDates(loadedMonth);
      }
    }

    xDown = null;
    yDown = null;
  }

  /* LOAD HOMEWORK */

  loadDates(loadedMonth);
  optimizeStyle();

  function loadDates(monat) {
    $('div.content div.dates div.body').html('');
    $('div.content div.dates div.top p').text(monat.getMonthName() + ' ' + monat.getFullYear());
    var output = '';
    var firstDay = monat;
    firstDay.setDate(1);
    if(!mobile) {
      output += '<table><thead><tr><th>Montag</th><th>Dienstag</th><th>Mittwoch</th><th>Donnerstag</th><th>Freitag</th><th>Samstag</th><th>Sonntag</th></tr></thead><tbody>';
    } else {
      output += '<table><thead><tr><th>Mo</th><th>Di</th><th>Mi</th><th>Do</th><th>Fr</th><th>Sa</th><th>So</th></tr></thead><tbody>';
    }
    for(var week = 0; week < monat.getWeeksInMonth(); week++) {
      output += '<tr>';
      if(week == 0) {
        if(firstDay.getDayNumber() !== 0) {
          for(var day = 0; day < firstDay.getDayNumber(); day++) {
            output += '<td></td>';
          }
        }
        for(var day = firstDay.getDayNumber(); day < 7; day++) {
          date = firstDay.addDays(day - firstDay.getDayNumber()).getDate();
          mySQLdate = new Date(monat.getFullYear(), monat.getMonth(), date).toMySQLFormat();
          output += '<td><p class="day" data-date="' + date + '">' + date + '</p>';
          $.ajax({
            url: '/system/getDate.php',
            type: 'POST',
            data: {datum: mySQLdate},
            success: function(data) {
              result = JSON.parse(data);
              result.forEach(function(termin, index) {
                output += '<div class="termin"><p>' + termin + '</p></div>';
              });
            },
            async: false
          });
          output += '</td>';
        }
      } else {
        for(var day = 0; day < 7; day++) {
          date = 7 - firstDay.getDayNumber() + (week - 1) * 7 + day + 1;
          mySQLdate = new Date(monat.getFullYear(), monat.getMonth(), date).toMySQLFormat();
          if(date > monat.getDaysInMonth()) {
            output += '<td></td>';
          } else{
            output += '<td><p class="day" data-date="' + date + '">' + date + '</p>';
            $.ajax({
              url: '/system/getDate.php',
              type: 'POST',
              data: {datum: mySQLdate},
              success: function(data) {
                result = JSON.parse(data);
                result.forEach(function(termin, index) {
                  output += '<div class="termin"><p>' + termin + '</p></div>';
                });
              },
              async: false
            });
            output += '</td>';
          }
        }
      }
      output += '</tr>';
    }
    output += '</tbody>';
    $('div.content div.dates div.body').append(output);
    if(monat.getMonth() == new Date().getMonth()) {
      $('div.content div.dates div.body table tbody tr td p.day[data-date="' + new Date().getDate() + '"]').parent().addClass('today');
    }

    $('div.content div.dates div.body table tbody tr td div.termin').click(function(event) {
      tag = $(this).parent('td').children('p.day').data('date');
      current = monat;
      current.setDate(tag);
      var $overlay = $('div.popup-overlay');
      $overlay.css('display', 'block');
      var $popup = $('div.popup');
      $popup.css('display', 'block');
      var groups = '';
      $(this).parent().children('div.termin').each(function(index, el) {
        termin = $(el).children('p').text();
        groups += '<div class="group"><p class="key">Termin</p><p class="value">' + termin + '</p></div>';
      });
      setTimeout(function() {
        $popup.css('opacity', '1');
        $overlay.css('opacity', '1');
      }, 10);
      $popup.html('');
      $popup.append('<p class="title">' + current.toFullFormat() + '</p><div class="body">' + groups + '</div>' +
        '<div class="buttons"><div class="ok"><p>OK</p></div></div>');

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
    });
  }

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

});

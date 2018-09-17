$(document).ready(function() {

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

  Date.prototype.toMySQLFormat = function(days) {
    var dat = new Date(this.valueOf());
    return dat.getFullYear() + '-' + ('0' + (dat.getMonth() + 1)).slice(-2) + '-' + ("0" + dat.getDate()).slice(-2);
  };

  Date.prototype.toFullFormat = function(days) {
    var dat = new Date(this.valueOf());
    var monate = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'Novermber', 'Dezember'];
    return ("0" + dat.getDate()).slice(-2) + '. ' + monate[dat.getMonth()] + ' ' + dat.getFullYear();
  };

  Date.prototype.getDayNumber = function() {
    var dat = new Date(this.valueOf());
    day = dat.getDay() - 1;
    if(day == -1)
      day = 6;
    return day;
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

  $('div.content div.homework-admin div.top div.left i').click(function(event) {
    setTimeout(function() {
      loadHomework(--loadedWeek);
    }, 20);
  });

  $('div.content div.homework-admin div.top div.right i').click(function(event) {
    setTimeout(function() {
      loadHomework(++loadedWeek);
    }, 20);
  });

  $('div.content div.homework-admin div.top p').click(function(event) {
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
      console.log(evt.touches);
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
    $('div.content div.homework-admin div.body').html('');
    $('div.content div.homework-admin div.top p').text('Woche ' + woche);
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
            var result = JSON.parse(data);

            $.ajax({
              url: '/system/getScheduleColumn.php',
              type: 'POST',
              data: {tag: dayDate.getDayNumber()},
              success: function(lesson) {
                lesson = JSON.parse(lesson);
                var homeworks = [];

                lesson.forEach(function(lesson, index) {
                  split = undefined;
                  $.each(result, function(index, el) {
                    if(el.split('||')[0] == lesson.split('||')[0]) {
                      split = el.split('||');
                    }
                  });
                  if(split !== undefined) {
                    stunde = parseInt(split[0]);
                    fach = split[1];
                    kurz = split[2];
                    aufgabe = split[3];

                    homeworks.push('<tr data-type="update"><td data-column="stunde">' + (stunde + 1) + '</td><td data-column="fach">' + fach + '</td><td data-column="aufgabe" contenteditable>' + aufgabe + '</td></tr>');
                  } else {
                    split = lesson.split('||');
                    stunde = parseInt(split[0]);
                    fach = split[1];
                    homeworks.push('<tr data-type="insert"><td data-column="stunde">' + (stunde + 1) + '</td><td data-column="fach">' + fach + '</td><td data-column="aufgabe" ' + (fach == "Wahlpflichtfach" || fach == "Spanisch" ? '' : 'contenteditable') + '></td></tr>');
                  }

                });

                $('div.content div.homework-admin div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + '</p><table data-date="' + dayDate.toMySQLFormat() + '"><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th></tr></thead><tbody>' + homeworks.join('') + '</tbody></table>');
              },
              async: false
            });
          },
          async: false
        });
      } else {
        $.ajax({
          url: '/system/getHomeworkHistory.php',
          type: 'POST',
          data: {datum: dayDate.toMySQLFormat()},
          success: function(data) {
            var result = JSON.parse(data);

            $.ajax({
              url: '/system/getScheduleColumn.php',
              type: 'POST',
              data: {tag: dayDate.getDayNumber()},
              success: function(lesson) {
                lesson = JSON.parse(lesson);
                var homeworks = [];

                lesson.forEach(function(lesson, index) {
                  split = undefined;
                  $.each(result, function(index, el) {
                    if(el.split('||')[0] == lesson.split('||')[0]) {
                      split = el.split('||');
                    }
                  });
                  if(split !== undefined) {
                    stunde = parseInt(split[0]);
                    fach = split[1];
                    kurz = split[2];
                    aufgabe = split[3];

                    homeworks.push('<tr data-type="update"><td data-column="stunde">' + (stunde + 1) + '</td><td data-column="kurz" data-fach="' + fach + '">' + kurz + '</td><td data-column="aufgabe" contenteditable>' + aufgabe + '</td></tr>');
                  } else {
                    split = lesson.split('||');
                    stunde = parseInt(split[0]);
                    fach = split[1];
                    kurz = split[2];
                    homeworks.push('<tr data-type="insert"><td data-column="stunde">' + (stunde + 1) + '</td><td data-column="kurz" data-fach="' + fach + '">' + kurz + '</td><td data-column="aufgabe" ' + (fach == "Wahlpflichtfach" || fach == "Spanisch" ? '' : 'contenteditable') + '></td></tr>');
                  }

                });

                $('div.content div.homework-admin div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + '</p><table data-date="' + dayDate.toMySQLFormat() + '"><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th></tr></thead><tbody>' + homeworks.join('') + '</tbody></table>');
              },
              async: false
            });
          },
          async: false
        });
        /*
        $.ajax({
          url: '/system/getHomeworkHistory.php',
          type: 'POST',
          data: {datum: dayDate.toMySQLFormat()},
          success: function(data) {
            var result = JSON.parse(data);

            $.ajax({
              url: '/system/getScheduleColumn.php',
              type: 'POST',
              data: {tag: dayDate.getDayNumber()},
              success: function(lesson) {
                lesson = JSON.parse(lesson);
                var homeworks = [];

                lesson.forEach(function(lesson, index) {
                  split = undefined;
                  $.each(result, function(index, el) {
                    if(el.split('||')[0] == lesson.split('||')[0]) {
                      split = el.split('||');
                    }
                  });
                  if(split !== undefined) {
                    stunde = parseInt(split[0]);
                    fach = split[1];
                    kurz = split[2];
                    aufgabe = split[3];

                    homeworks.push('<tr data-type="update"><td data-column="stunde">' + (stunde + 1) + '</td><td data-column="kurz" data-fach="' + fach + '">' + kurz + '</td><td data-column="aufgabe" contenteditable>' + aufgabe + '</td></tr>');
                  } else {
                    split = lesson.split('||');
                    stunde = parseInt(split[0]);
                    fach = split[1];
                    homeworks.push('<tr data-type="insert"><td data-column="stunde">' + (stunde + 1) + '</td><td data-column="kurz" data-fach="' + fach + '">' + kurz + '</td><td data-column="aufgabe" ' + (fach == "Wahlpflichtfach" ? '' : 'contenteditable') + '></td></tr>');
                  }

                });

                $('div.content div.homework-admin div.body').append('<p class="day">' + tage[day] + ', ' + dayDate.toFullFormat() + '</p><table data-date="' + dayDate.toMySQLFormat() + '"><thead><tr><th>Stunde</th><th>Fach</th><th>Aufgabe</th></tr></thead><tbody>' + homeworks.join('') + '</tbody></table>');
              },
              async: false
            });
          },
          async: false
        });*/
      }
    }
    if(woche == new Date().getWeek()) {
      $('div.content div.homework-admin div.body p.day:eq(' + (new Date().getDay() - 1) + ')').addClass('today');
    }
    enableChangeListener();
  }

  function enableChangeListener() {
    $('div.content div.homework-admin div.body table tbody tr td[contenteditable]').unbind();
    $('div.content div.homework-admin div.body table tbody tr td[contenteditable]').focusout(function(event) {
      $tr = $(this).parent();
      datum = $tr.parent().parent().attr('data-date');
      stunde = parseInt($tr.children('td[data-column=stunde]').text()) - 1;
      fach = $tr.children('td[data-column=fach]').text();
      aufgabe = ($tr.children('td[data-column=aufgabe]').html()).trim();
      if(mobile)
        fach = $tr.children('td[data-column=kurz]').attr('data-fach');

      console.log(datum + ' ' + stunde + ' ' + fach + ' ' + aufgabe);

      if($tr.attr('data-type') == "insert") {
        if(aufgabe !== '')
          $tr.attr('data-type', 'update');
        $.ajax({
          url: '/system/getHomework.php',
          type: 'POST',
          data: {'fach': fach},
          success: function(data) {
            result = null;
            if(data !== 'null')
              result = JSON.parse(data);
            if(data == 'null') {
              if(aufgabe !== '') {
                if(aufgabe == 'X') {
                  console.log(1);
                  $.ajax({
                    url: '/admin-area/system/setData.php',
                    type: 'POST',
                    data: {'table': 'homeworkHistory', 'data': JSON.stringify([{0: '', 1: datum, 2: stunde, 3: fach, 4: aufgabe}])},
                    async: false
                  });
                } else {
                  console.log(2);
                  $.ajax({
                    url: '/admin-area/system/setData.php',
                    type: 'POST',
                    data: {'table': 'homeworkHistory', 'data': JSON.stringify([{0: '', 1: datum, 2: stunde, 3: fach, 4: aufgabe}])},
                    async: false
                  });
                  $.ajax({
                    url: '/admin-area/system/setData.php',
                    type: 'POST',
                    data: {'table': 'homework', 'data': JSON.stringify([{0: '', 1: datum, 2: fach, 3: aufgabe}])},
                    async: false
                  });
                }
              }
            } else if (new Date(datum).getTime() >= new Date(result.datum).getTime()) {
              if(aufgabe == '') {
                console.log(3);
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify({'datum': datum, 'fach': fach})},
                  async: false
                });
              } else if(aufgabe == 'X') {
                console.log(4);
                $.ajax({
                  url: '/admin-area/system/setData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{0: '', 1: datum, 2: stunde, 3: fach, 4: aufgabe}])},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify({'datum': result.datum, 'fach': fach})},
                  async: false
                });
              } else {
                console.log(5);
                $.ajax({
                  url: '/admin-area/system/setData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{0: '', 1: datum, 2: stunde, 3: fach, 4: aufgabe}])},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify([{'datum': datum, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach})},
                  async: false
                });
              }
            } else {
              if(aufgabe !== '') {
                console.log(6);
                $.ajax({
                  url: '/admin-area/system/setData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{0: '', 1: datum, 2: stunde, 3: fach, 4: aufgabe}])},
                  async: false
                });
              }
            }
          },
          async: false
        });
      } else {
        if(aufgabe == '')
          $tr.attr('data-type', 'insert');
        $.ajax({
          url: '/system/getHomework.php',
          type: 'POST',
          data: {'fach': fach},
          success: function(data) {
            result = null;
            if(data !== 'null')
              result = JSON.parse(data);
            if(data == 'null') {
              if(aufgabe == '') {
                console.log(7);
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify({'datum': datum, 'stunde': stunde, 'fach': fach})},
                  async: false
                });
              } else {
                console.log(8);
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{'datum': datum, 'stunde': stunde, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach, 'datum': datum})},
                  async: false
                });
                if(aufgabe !== 'X') {
                  console.log(9);
                  $.ajax({
                    url: '/admin-area/system/setData.php',
                    type: 'POST',
                    data: {'table': 'homework', 'data': JSON.stringify([{0: '', 1: datum, 2: fach, 3: aufgabe}])},
                    async: false
                  });
                }
              }
            } else if (data !== 'null' && new Date(datum).getTime() >= new Date(result.datum).getTime()) {
              if(aufgabe == '') {
                console.log(10);
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify({'datum': datum, 'stunde': stunde, 'fach': fach})},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify({'datum': datum, 'fach': fach})},
                  async: false
                });
              } else if(aufgabe == 'X') {
                console.log(11);
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{'datum': datum, 'stunde': stunde, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach, 'datum': datum})},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify({'datum': datum, 'fach': fach})},
                  async: false
                });
              } else {
                console.log(12);
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{'datum': datum, 'stunde': stunde, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach, 'datum': datum})},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify([{'datum': datum, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach})},
                  async: false
                });
              }
            } else {
              if(aufgabe == '') {
                console.log(13);
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify({'datum': datum, 'stunde': stunde, 'fach': fach})},
                  async: false
                });
              } else if(aufgabe == 'X') {
                console.log(14);
                $.ajax({
                  url: '/admin-area/system/deleteData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify({'datum': datum, 'fach': fach})},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{'datum': datum, 'stunde': stunde, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach, 'datum': datum})},
                  async: false
                });
              } else {
                console.log(15);
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homeworkHistory', 'data': JSON.stringify([{'datum': datum, 'stunde': stunde, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach, 'datum': datum})},
                  async: false
                });
                $.ajax({
                  url: '/admin-area/system/updateData.php',
                  type: 'POST',
                  data: {'table': 'homework', 'data': JSON.stringify([{'datum': datum, 'fach': fach, 'aufgabe': aufgabe}]), 'where': JSON.stringify({'fach': fach, 'datum': datum})},
                  success: function(news) {
                    console.log(news);
                  },
                  async: false
                });
              }
            }
          },
          async: false
        });

      }
    });
  }

});

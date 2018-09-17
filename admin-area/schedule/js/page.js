$(document).ready(function() {

  /* MOBILE */

  var mobile = $(window).width() < 800;

  $(window).resize(function(event) {
    mobile = $(window).width() < 800;
    optimizeStyle();
  });

  function optimizeStyle() {

  }

  /* NO SELECTED FUNCTIONS */

  function enableNoSelectedFuncts() {
    $('div.content div.schedule-admin div.top div.autoincrement i').click(function(event) {
      var $overlay = $('div.popup-overlay');
      var $popup = $('div.popup');
      $overlay.css('display', 'block');
      $popup.css('display', 'block');
      setTimeout(function() {
        $popup.css('opacity', '1');
        $overlay.css('opacity', '1');
      }, 10);
      $.ajax({
        url: '/admin-area/system/getAutoIncrement.php',
        type: 'POST',
        data: {table: 'schedule'},
        success: function(data) {
          result = JSON.parse(data);
          $('div.popup input').val(parseInt(result.AUTO_INCREMENT));
        },
        async: false
      });

    });

    $('div.popup div.buttons div.ok').click(function(event) {
      $.ajax({
        url: '/admin-area/system/setAutoIncrement.php',
        type: 'POST',
        data: {table: 'schedule', autoincrement: $('div.popup input').val()},
        async: false
      });
      var $overlay = $('div.popup-overlay');
      var $popup = $('div.popup');
      $overlay.css('opacity', '0');
      $popup.css('opacity', '0');
      setTimeout(function() {
        $overlay.removeAttr('style');
        $popup.removeAttr('style');
      }, 120);
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

    $('div.content div.schedule-admin div.top div.add i').click(function(event) {
      $('div.content div.schedule-admin div.body table tbody').append('<tr class="added">' +
        '<td><i class="material-icons save">save</i></td>' +
        '<td onKeypress="if(event.keyCode < 48 || event.keyCode > 57){return false;}" data-column="ID" contenteditable></td>' +
        '<td onKeypress="if(event.keyCode < 48 || event.keyCode > 57){return false;}" data-column="tag" contenteditable></td>' +
        '<td onKeypress="if(event.keyCode < 48 || event.keyCode > 57){return false;}" data-column="stunde" contenteditable></td>' +
        '<td data-column="fach" contenteditable></td>' +
        '<td data-column="kurz" contenteditable></td>' +
        '<td data-column="raum" contenteditable></td>' +
        '<td data-column="lehrer" contenteditable></td>' +
        '<td data-column="farbe" contenteditable></td></tr>');
      $(window).scrollTop($(document).outerHeight());
      $('tr.added i.save').click(function(event) {
        $tr = $(this).parent().parent();
        $tr.removeClass('added');
        empty = true;
        $tr.children('td[data-column]').each(function(index, el) {
          if(!($(el).text() == '' || $(el).text() == null || $(el).text() == undefined)) {
            empty = false;
          }
        });
        if(empty) {
          $tr.remove();
        } else {
          ID = parseInt($tr.children('td[data-column=ID]').text());
          TAG = parseInt($tr.children('td[data-column=tag]').text());
          STUNDE = parseInt($tr.children('td[data-column=stunde]').text());
          FACH = $tr.children('td[data-column=fach]').text();
          KURZ = $tr.children('td[data-column=kurz]').text();
          RAUM = $tr.children('td[data-column=raum]').text();
          LEHRER = $tr.children('td[data-column=lehrer]').text();
          FARBE = $tr.children('td[data-column=farbe]').text();
          DATA = [{0: ID, 1: TAG, 2: STUNDE, 3: FACH, 4: KURZ, 5: RAUM, 6:LEHRER, 7: FARBE}];
          DATA = JSON.stringify(DATA);
          $.ajax({
            url: '/admin-area/system/setData.php',
            type: 'POST',
            data: {table: 'schedule', data: DATA},
            success: function() {
              loadSchedule();
            }
          });
        }
      });
    });
  }

  /* LOAD SCHEDULE */

  loadSchedule();
  optimizeStyle();
  enableNoSelectedFuncts();

  function loadSchedule() {
    $('div.content div.schedule-admin div.body table tbody').html('');
    $.ajax({
      url: '/system/getData.php',
      type: 'POST',
      data: {table: 'schedule'},
      success: function(data) {
        result = JSON.parse(data);
        $.each(result, function(index, lesson) {
          split = lesson.split('||');
          id = split[0];
          tag = split[1];
          stunde = split[2];
          fach = split[3];
          kurz = split[4];
          raum = split[5];
          lehrer = split[6];
          farbe = split[7];

          $('div.content div.schedule-admin div.body table tbody').append('<tr data-id="' + id + '">' +
            '<td><i class="material-icons checkbox">check_box_outline_blank</i></td>' +
            '<td onKeypress="if(event.keyCode < 48 || event.keyCode > 57){return false;}" data-column="ID">' + id + '</td>' +
            '<td onKeypress="if(event.keyCode < 48 || event.keyCode > 57){return false;}" data-column="tag">' + tag + '</td>' +
            '<td onKeypress="if(event.keyCode < 48 || event.keyCode > 57){return false;}" data-column="stunde">' + stunde + '</td>' +
            '<td data-column="fach">' + fach + '</td>' +
            '<td data-column="kurz">' + kurz + '</td>' +
            '<td data-column="raum">' + raum + '</td>' +
            '<td data-column="lehrer">' + lehrer + '</td>' +
            '<td data-column="farbe" style="background-color: ' + (farbe == '#000000' ? farbe + '; color: #FFF' : farbe) + '">' + farbe + '</td></tr>');
        });
      },
      async: false
    });
    enableCheckboxes();
  }

  /* SELECTED */

  function enableCheckboxes() {
    $('i.checkbox').unbind();
    $('i.checkbox').click(function(event) {
      if($(this).text() == 'check_box_outline_blank') {
        $(this).text('check_box');
        $(this).addClass('active');
        if($(this).parent().is('td'))
          $(this).parent().parent().addClass('selected');
        if($(this).parent().is('th')) {
          $('i.checkbox').each(function(index, el) {
            if($(el).parent('td').length !== 0) {
              $(el).text('check_box');
              $(el).addClass('active');
              if($(el).parent().is('td'))
                $(el).parent().parent().addClass('selected');
            }
          });
        } else {
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
        if($(this).parent().is('td'))
          $(this).parent().parent().removeClass('selected');
        if($(this).parent().is('th')) {
          $('i.checkbox').each(function(index, el) {
            $(this).text('check_box_outline_blank');
            $(this).removeClass('active');
            if($(this).parent().is('td'))
              $(this).parent().parent().removeClass('selected');
          });
        } else if($('th i.checkbox').text() == 'check_box') {
            $('th i.checkbox').text('check_box_outline_blank');
            $('th i.checkbox').removeClass('active');
        }
      }
      changeOpts();
    });
  }

  function changeOpts() {
    if($('tbody tr.selected').length == 0) {
      $('div.content div.schedule-admin div.top').removeClass('opt');
      $('div.content div.schedule-admin div.top').html(
      '<div class="back">' +
        '<i class="material-icons" onclick="window.location = \'/admin-area\'">arrow_back</i>' +
      '</div>' +
      '<p>Stundenplan verwalten</p>' +
      '<div class="add">' +
        '<i class="material-icons">add</i>' +
      '</div>' +
      '<div class="autoincrement">' +
        '<i class="material-icons">format_list_numbered</i>' +
      '</div>');
      enableNoSelectedFuncts();
      removeSelectedFunctions();
    } else {
      amount = $('tbody tr.selected').length;
      $('div.content div.schedule-admin div.top').addClass('opt');
      $('div.content div.schedule-admin div.top').html(
      '<p class="select">' + (amount == 1 ? amount + ' Eintrag' : amount + ' Einträge')  + ' ausgewählt</p>' +
      '<div class="delete">' +
        '<i class="material-icons">delete</i>' +
      '</div>' +
      '<div class="edit">' +
        '<i class="material-icons">edit</i>' +
      '</div>');
      Waves.attach('div.content div.schedule-admin div.top.opt div.delete i');
      Waves.attach('div.content div.schedule-admin div.top.opt div.edit i');
      setSelectedFunctions();
    }
  }

  function setSelectedFunctions() {
    $('div.content div.schedule-admin div.top.opt div.edit i').click(function(event) {
      $('tbody tr.selected td[data-column]').attr('contenteditable', 'true');
    });
    $('div.content div.schedule-admin div.top.opt div.delete i').click(function(event) {
      $('tbody tr.selected').each(function(index, el) {
        ID = parseInt($(this).data('id'));
        $.ajax({
          url: '/admin-area/system/deleteData.php',
          type: 'POST',
          data: {table: 'schedule', 'data': JSON.stringify({id: ID})}
        });
        $(this).remove();
        changeOpts();
      });
    });
  }

  function removeSelectedFunctions() {
    if($('tbody tr td[contenteditable]') !== 0) {
      var DATA = [];
      $('tbody tr').each(function(index, el) {
        ID = parseInt($(el).children('td[data-column=ID]').text());
        TAG = parseInt($(el).children('td[data-column=tag]').text());
        STUNDE = parseInt($(el).children('td[data-column=stunde]').text());
        FACH = $(el).children('td[data-column=fach]').text();
        KURZ = $(el).children('td[data-column=kurz]').text();
        RAUM = $(el).children('td[data-column=raum]').text();
        LEHRER = $(el).children('td[data-column=lehrer]').text();
        FARBE = $(el).children('td[data-column=farbe]').text();
        DATA.push({
          0: ID,
          1: TAG,
          2: STUNDE,
          3: FACH,
          4: KURZ,
          5: RAUM,
          6: LEHRER,
          7: FARBE
        });
      });
      $('tbody tr td[contenteditable]').removeAttr('contenteditable');
      $.ajax({
        url: '/admin-area/system/resetData.php',
        type: 'POST',
        data: {table: 'schedule', data: JSON.stringify(DATA)},
        async: false
      });
    }
  }

});

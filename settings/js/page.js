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

    /* SET STATES */
  function setStates() {
    $('li#spanisch label.toggle input').prop('checked', settings.schedule.spanisch);
    if(settings.schedule.fs2 !== null) {
      $('li#fs2 p.secondary').text((settings.schedule.fs2 == 'l' ? 'Latein' : 'Französich'));
    } else {
      $('li#fs2 p.secondary').text('Französich oder Latein');
    }
    if(settings.schedule.religion !== null) {
      $('li#religion p.secondary').text((settings.schedule.religion == 'er' ? 'Evangelische Religion' : (settings.schedule.religion == 'kr' ? 'Katholische Religion' : 'Philosophie')));
    } else {
      $('li#religion p.secondary').text('Evangelisch, katholisch oder Philosophie');
    }
    if(settings.schedule.wp !== null) {
      $('li#wp p.secondary').text((settings.schedule.wp == 'tech' ? 'Technik' : (settings.schedule.wp == 'info' ? 'Informatik' : (settings.schedule.wp == 'wa' ? 'Wirtschaft' :
        (settings.schedule.wp == 'ku-d' ? 'Kunst/Design' : (settings.schedule.wp == 's' ? 'Spanisch' : 'Ernährungslehre'))))));
    } else {
      $('li#wp p.secondary').text('Technik, Informatik, Wirtschaft, Kunst/Design, ...');
    }
    $('li#farben label.toggle input').prop('checked', settings.schedule.farben);

    $('li#limit p.secondary').text(settings.dates.limit + ' Termine gleichzeitig');
  }
  setStates();

    /* CHANGE LISTENERS */
  $('li#spanisch label.toggle input').change(function(event) {
    if($(this).prop('checked')) {
      settings.schedule.spanisch = true;
      localStorage.settings = JSON.stringify(settings);
    } else {
      settings.schedule.spanisch = false;
      localStorage.settings = JSON.stringify(settings);
    }
  });

    /* 2. Fremdsprache */
  $('li#fs2').click(function(event) {
    $('ul.choose').css('opacity', '0');
    $('ul.choose').css('display', 'none');
    var $selectMenu = $(this).children('ul.choose');
    $selectMenu.css('display', 'block');
    setTimeout(function() {
      $selectMenu.css('opacity', '1');
    }, 10);
    switch (settings.schedule.fs2) {
      case null:
        $selectMenu.css('top', (-14) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'none') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

      case 'f':
        $selectMenu.css('top', (-14-8-1*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'f') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

      case 'l':
        $selectMenu.css('top', (-14-8-2*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'l') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

    }
  }).children('ul').click(function(e) {
    return false;
  });

  $('li#fs2 ul.choose li').click(function(event) {
    var $selectMenu = $(this).parent('ul.choose');
    settings.schedule.fs2 = ($(this).data('value') == 'none' ? null : $(this).data('value'));
    localStorage.settings = JSON.stringify(settings);
    setStates();
    $selectMenu.css('opacity', '0');
    setTimeout(function() {
      $selectMenu.removeAttr('style');
    }, 125);
  });

    /* Religion */
  $('li#religion').click(function(event) {
    $('ul.choose').css('opacity', '0');
    $('ul.choose').css('display', 'none');
    var $selectMenu = $(this).children('ul.choose');
    $selectMenu.css('display', 'block');
    setTimeout(function() {
      $selectMenu.css('opacity', '1');
    }, 10);
    switch (settings.schedule.religion) {
      case null:
        $selectMenu.css('top', (-14) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'none') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

      case 'er':
        $selectMenu.css('top', (-14-1*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'er') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

      case 'kr':
        $selectMenu.css('top', (-14-2*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'kr') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

      case 'ppl':
        $selectMenu.css('top', (-14-3*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'ppl') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        break;

    }
  }).children('ul').click(function(e) {
    return false;
  });

  $('li#religion ul.choose li').click(function(event) {
    var $selectMenu = $(this).parent('ul.choose');
    settings.schedule.religion = ($(this).data('value') == 'none' ? null : $(this).data('value'));
    localStorage.settings = JSON.stringify(settings);
    setStates();
    $selectMenu.css('opacity', '0');
    setTimeout(function() {
      $selectMenu.removeAttr('style');
    }, 125);
  });

    /* Wahlpflichtfach */
  $('li#wp').click(function(event) {
    $('ul.choose').css('opacity', '0');
    $('ul.choose').css('display', 'none');
    var $selectMenu = $(this).children('ul.choose');
    $selectMenu.css('display', 'block');
    setTimeout(function() {
      $selectMenu.css('opacity', '1');
    }, 10);
    switch (settings.schedule.wp) {
      case null:
        $selectMenu.css('top', (-14) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'none') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 'tech':
        $selectMenu.css('top', (-14-1*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'tech') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 'info':
        $selectMenu.css('top', (-14-2*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'info') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 'wa':
        $selectMenu.css('top', (-14-3*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'wa') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 'ku-d':
        $selectMenu.css('top', (-14-4*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'ku-d') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 's':
        $selectMenu.css('top', (-14-4*48-10) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 's') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(38);
        break;

      case 'ern':
        $selectMenu.css('top', (-14-4*48-10) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == 'ern') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(100);
        break;

    }
  }).children('ul').click(function(e) {
    return false;
  });

  $('li#wp ul.choose li').click(function(event) {
    var $selectMenu = $(this).parent('ul.choose');
    settings.schedule.wp = ($(this).data('value') == 'none' ? null : $(this).data('value'));
    localStorage.settings = JSON.stringify(settings);
    setStates();
    $selectMenu.css('opacity', '0');
    setTimeout(function() {
      $selectMenu.removeAttr('style');
    }, 125);
  });

    /* Termin-Limit */
  $('li#limit').click(function(event) {
    $('ul.choose').css('opacity', '0');
    $('ul.choose').css('display', 'none');
    var $selectMenu = $(this).children('ul.choose');
    $selectMenu.css('display', 'block');
    setTimeout(function() {
      $selectMenu.css('opacity', '1');
    }, 10);
    switch (settings.dates.limit) {
      case 3:
        $selectMenu.css('top', (-14) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '3') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 4:
        $selectMenu.css('top', (-14-1*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '4') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 5:
        $selectMenu.css('top', (-14-2*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '5') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 6:
        $selectMenu.css('top', (-14-3*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '6') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 7:
        $selectMenu.css('top', (-14-4*48) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '7') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(0);
        break;

      case 8:
        $selectMenu.css('top', (-14-4*48-10) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '8') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(38);
        break;

      case 9:
        $selectMenu.css('top', (-14-4*48-10) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '9') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(86);
        break;

      case 10:
        $selectMenu.css('top', (-14-4*48-10) + 'px');
        $selectMenu.children('li').each(function(index, el) {
          if($(this).data('value') == '10') {
            $(this).addClass('selected');
          } else {
            $(this).removeClass('selected');
          }
        });
        $selectMenu.scrollTop(150);
        break;

    }
  }).children('ul').click(function(e) {
    return false;
  });

  $('li#limit ul.choose li').click(function(event) {
    var $selectMenu = $(this).parent('ul.choose');
    settings.dates.limit = ($(this).data('value') == 'none' ? null : parseInt($(this).data('value')));
    localStorage.settings = JSON.stringify(settings);
    setStates();
    $selectMenu.css('opacity', '0');
    setTimeout(function() {
      $selectMenu.removeAttr('style');
    }, 125);
  });

    /* CHANGE LISTENERS */
  $('li#farben label.toggle input').change(function(event) {
    if($(this).prop('checked')) {
      settings.schedule.farben = true;
      localStorage.settings = JSON.stringify(settings);
    } else {
      settings.schedule.farben = false;
      localStorage.settings = JSON.stringify(settings);
    }
  });

});

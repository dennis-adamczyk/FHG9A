$(document).ready(function() {

  var OneSignal = window.OneSignal || [];

  /* LOCAL STORAGE */

  if(typeof(Storage) == undefined || typeof(Storage) == "undefined") {
    alert('Error! Dein Browser unterstützt das lokale Speichern nicht.\nBitte benutze die neuste Version von Google Chrome, Safari oder Firefox!');
  }

  var intro = false;

  if(localStorage.intro == null || localStorage.intro == undefined) {
    localStorage.setItem('intro', intro);
  } else {
    intro = (localStorage.intro == 'true');
  }

  var isMobile = ($(window).width() < 800);

  var webapp = ((window.navigator.standalone == true || window.matchMedia('(display-mode: standalone)').matches || ($(location).attr('search').toLowerCase() == '?webapp')) && isMobile) ? true : false;

  if(localStorage.webapp == null || localStorage.webapp == undefined) {
    localStorage.setItem('webapp', webapp);
  } else {
    if(webapp) {
      localStorage.setItem('webapp', webapp);
    }
    webapp = (localStorage.webapp == 'true');
  }

  var isWebApp = (window.matchMedia('(display-mode: standalone)').matches || ($(location).attr('search').toLowerCase() == '?webapp') || webapp ? true : false);

  if (!isWebApp && isMobile && ($(location).attr('search').toLowerCase() !== '?webapp&skip')) {
    $('body').prepend(
      '<div class="install">' +
        '<img src="/img/logo.png">' +
        '<p class="title">Installiere jetzt die WebApp</p>' +
        '<p>Befolge die folgenden Schritte um die WebApp schnell und einfach zu installieren:</p>' +
      '</div>');
    var $install = $('div.install');
    var md = new MobileDetect(window.navigator.userAgent);
    if(md.userAgents().includes('Chrome')) {
      $install.append('<ol>' +
        '<li>Tippe auf das <i class="material-icons">more_vert</i> Symbol oben rechts</li>' +
        '<li>Wähle im Menü die Option "Zum Startbildschirm zufügen"</li>' +
        '<li>Im darauf folgenden Pop-Up drückst du auf "HINZUFÜGEN"</li>' +
      '</ol>' +
      '<p>Nun ist die WebApp auf deinem Startbildschirm gespeichert. Du kannst die WebApp nun direkt von deinem Startbildschirm aus öffnen.</p>');
    } else if(md.userAgents().includes('Safari')) {
      $install.append('<ol>' +
        '<li>Tippe auf das <img src="/img/icons/teilenIOS.svg" /> Symbol unten am Bildschirm</li>' +
        '<li>Wähle im Menü das <i class="material-icons">add_box</i> Symbol</li>' +
        '<li>Im darauf folgenden Bildschirm drückst du auf "Hinzufügen"</li>' +
      '</ol>' +
      '<p>Nun ist die WebApp auf deinem Startbildschirm gespeichert. Du kannst die WebApp nun direkt von deinem Startbildschirm aus öffnen.</p>');
    } else if(md.userAgents().includes('Firefox')) {
      $install.append('<ol>' +
        '<li>Tippe auf das <img src="/img/icons/saveFirefox.svg" /> Symbol oben rechts</li>' +
        '<li>Klicke im Menü auf "<i class="material-icons">add</i> ZU STARTBILDSCHIRM HINZUFÜGEN"</li>' +
      '</ol>' +
      '<p>Nun ist die WebApp auf deinem Startbildschirm gespeichert. Du kannst die WebApp nun direkt von deinem Startbildschirm aus öffnen.</p>');
    } else if (md.userAgents().includes('Edge')) {
      $install.append('<ol>' +
        '<li>Tippe auf das <i class="material-icons">more_horiz</i> Symbol unten rechts</li>' +
        '<li>Klicke im Menü auf "Zu Startbildschirm hinzu"</li>' +
        '<li>Im darauf folgenden Bildschirm drückst du auf "Hinzufügen"</li>' +
      '</ol>' +
      '<p>Nun ist die WebApp auf deinem Startbildschirm gespeichert. Du kannst die WebApp nun direkt von deinem Startbildschirm aus öffnen.</p>');
    } else if(md.userAgents().includes('Opera')) {
      $install.append('<ol>' +
        '<li>Tippe auf das <i class="material-icons">more_vert</i> Symbol unten rechts</li>' +
        '<li>Klicke im Menü auf "<i class="material-icons">phone_android</i>Zum Start-Bildschirm hinzufügen"</li>' +
        '<li>Im darauf folgenden Bildschirm drückst du auf "HINZUFÜGEN"</li>' +
      '</ol>' +
      '<p>Nun ist die WebApp auf deinem Startbildschirm gespeichert. Du kannst die WebApp nun direkt von deinem Startbildschirm aus öffnen.</p>');
    } else {
      $install.append('<ol>' +
        '<li>Tippe auf das Menü Symbol</li>' +
        '<li>Klicke im Menü auf "Zum Startbildschirm hinzufügen"</li>' +
        '<li>Im darauf folgenden Bildschirm drückst du auf "Hinzufügen"</li>' +
      '</ol>' +
      '<p>Nun ist die WebApp auf deinem Startbildschirm gespeichert. Du kannst die WebApp nun direkt von deinem Startbildschirm aus öffnen.</p>');
    }
  }

  if((isWebApp && isMobile && !intro) || (!isMobile && !intro && ($(location).attr('search').toLowerCase() !== '?webapp&skip'))) {
    $('body').prepend(
      '<div class="intro isOpen">' +
        '<div data-id="1">' +
          '<img src="/img/intro/schedule.svg">' +
          '<p class="title">Individueller Stundenplan</p>' +
          '<p>Der Stundenplan ist immer aktuell und auf deine Fächer angepasst. Ein klick auf die Website genügt und man bekommt direkt den Stundenplan für den nächsten Tag angezeigt.</p>' +
        '</div>' +
        '<div data-id="2">' +
          '<img src="/img/intro/homework.svg">' +
          '<p class="title">Hausaufgaben</p>' +
          '<p>Nie wieder die Hausaufgaben vergessen, denn auf dieser Website gibt es die Hausaufgaben immer übersichtlich und aktuell.</p>' +
        '</div>' +
        '<div data-id="3">' +
          '<img src="/img/intro/dates.svg">' +
          '<p class="title">Termine</p>' +
          '<p>In einem übersichtlichen Kalender sind alle Termine und Feiertage eingezeichnet, damit man immer weiß, was diesen Monat ansteht.</p>' +
        '</div>' +
        '<div data-id="4">' +
          '<img src="/img/intro/settings.svg">' +
          '<p class="title">Erste Schritte</p>' +
          '<p>Im Folgenden gelangst du zu den Einstellungen, bei denen du deine individuellen Fächer einstellen kannst.</p>' +
        '</div>' +
        '<div class="steps"><div class="active"></div><div class="inactive"></div><div class="inactive"></div><div class="inactive"></div><div class="inactive"></div></div>' +
        '<div class="prev"><i class="material-icons">keyboard_arrow_left</i></div>' +
        '<div class="next"><i class="material-icons">keyboard_arrow_right</i></div>' +
      '</div>');
    var page = 1;
    var $intro = $('div.intro');
    $site = $intro.children('div[data-id]');
    $step = $intro.children('div.steps').children('div.active');
    $intro.children('div.prev').css('opacity', '0');
    $('div.intro div.next').click(function(event) {
      page++;
      if(page == 5) {
        intro = true;
        localStorage.setItem('intro', intro);
        window.location = '/settings';
      } else if(page == 4) {
        $site.eq(2).css('left', '-50%');
        $site.eq(3).css('left', '50%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').removeAttr('style');

        setTimeout(function() {
          OneSignal.push(function() {
            OneSignal.showHttpPrompt();
          });
        }, 300);
      } else if(page == 3) {
        $site.eq(1).css('left', '-50%');
        $site.eq(2).css('left', '50%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').removeAttr('style');
      } else {
        $site.eq(0).css('left', '-50%');
        $site.eq(1).css('left', '50%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').removeAttr('style');
      }
    });
    $('div.intro div.prev').click(function(event) {
      page--;
      $site = $intro.children('div[data-id]');
      if(page == 3) {
        $site.eq(2).css('left', '50%');
        $site.eq(3).css('left', '150%');
        $step.css('left', (page-1) * 18 + 'px');
      } else if(page == 2) {
        $site.eq(1).css('left', '50%');
        $site.eq(2).css('left', '150%');
        $step.css('left', (page-1) * 18 + 'px');
      } else {
        $site.eq(0).css('left', '50%');
        $site.eq(1).css('left', '150%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').css('opacity', '0');
      }
    });
    $('div.intro div.steps div.inactive').click(function(event) {
      page = $(this).index("div.inactive") + 1;
      if (page == 4) {
        $site.eq(0).css('left', '-50%');
        $site.eq(1).css('left', '-50%');
        $site.eq(2).css('left', '-50%');
        $site.eq(3).css('left', '50%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').removeAttr('style');

        setTimeout(function() {
          OneSignal.push(function() {
            OneSignal.showHttpPrompt();
          });
        }, 300);
      } else if (page == 3) {
        $site.eq(0).css('left', '-50%');
        $site.eq(1).css('left', '-50%');
        $site.eq(2).css('left', '50%');
        $site.eq(3).css('left', '150%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').removeAttr('style');
      } else if(page == 2) {
        $site.eq(0).css('left', '-50%');
        $site.eq(1).css('left', '50%');
        $site.eq(2).css('left', '150%');
        $site.eq(3).css('left', '150%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').removeAttr('style');
      } else {
        $site.eq(0).css('left', '50%');
        $site.eq(1).css('left', '150%');
        $site.eq(2).css('left', '150%');
        $site.eq(3).css('left', '150%');
        $step.css('left', (page-1) * 18 + 'px');
        $intro.children('div.prev').css('opacity', '0');
      }
    });

    var xDown = null;
    var yDown = null;

    document.addEventListener('touchstart', function(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
    }, false);
    document.addEventListener('touchmove', function(evt) {
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
        if ( xDiff < 0 ) {
          if(page >= 2 && page <= 4)
            page--;
          $site = $intro.children('div[data-id]');
          if(page == 3) {
            $site.eq(2).css('left', '50%');
            $site.eq(3).css('left', '150%');
            $step.css('left', (page-1) * 18 + 'px');
          } else if(page == 2) {
            $site.eq(1).css('left', '50%');
            $site.eq(2).css('left', '150%');
            $step.css('left', (page-1) * 18 + 'px');
          } else {
            $site.eq(0).css('left', '50%');
            $site.eq(1).css('left', '150%');
            $step.css('left', (page-1) * 18 + 'px');
            $intro.children('div.prev').css('opacity', '0');
          }
        }
        if ( xDiff > 0 ) {
          $site = $intro.children('div[data-id]');
          $step = $intro.children('div.steps').children('div.active');
          if(page >= 1 && page <= 4)
            page++;
          $site = $intro.children('div[data-id]');
          $step = $intro.children('div.steps').children('div.active');
          if(page == 5) {
            intro = true;
            localStorage.setItem('intro', intro);
            window.location = '/settings';
          } else if(page == 4) {
            $site.eq(2).css('left', '-50%');
            $site.eq(3).css('left', '50%');
            $step.css('left', (page-1) * 18 + 'px');
            $intro.children('div.prev').removeAttr('style');

            setTimeout(function() {
              OneSignal.push(function() {
                OneSignal.showHttpPrompt();
              });
            }, 300);
          } else if(page == 3) {
            $site.eq(1).css('left', '-50%');
            $site.eq(2).css('left', '50%');
            $step.css('left', (page-1) * 18 + 'px');
            $intro.children('div.prev').removeAttr('style');
          } else {
            $site.eq(0).css('left', '-50%');
            $site.eq(1).css('left', '50%');
            $step.css('left', (page-1) * 18 + 'px');
            $intro.children('div.prev').removeAttr('style');
          }
        }
      }

      xDown = null;
      yDown = null;
    }, false);
  }
});

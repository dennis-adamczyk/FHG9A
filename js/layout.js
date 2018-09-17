$(document).ready(function() {

  /* SERVICE WORKER */

  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
  //     // Registration was successful
  //     console.log('ServiceWorker registration successful with scope: ', registration.scope);
  //   }).catch(function(err) {
  //     // registration failed :(
  //     console.log('ServiceWorker registration failed: ', err);
  //   });
  // }

  /* EXTENDED-HEADER */
  if($('div.extended-header').length) {
    $(document).scroll(function(event) {
      var scrollTop = $(document).scrollTop();
      var $header = $('header');
      if($(window).width() < 800) {
        if(scrollTop > 56) {
          $header.css('box-shadow', '0 2px 5px rgba(0, 0, 0, .26)');
        } else {
          $header.css('box-shadow', 'none');
        }
      } else {
        if(scrollTop > 64) {
          $header.css('box-shadow', '0 2px 5px rgba(0, 0, 0, .26)');
        } else {
          $header.css('box-shadow', 'none');
        }
      }
    });
  } else {
    $('header').css('box-shadow', '0 2px 5px rgba(0, 0, 0, .26)');
  }

  /* HEADER-MORE-MENU */

  setPageTitle();

  function setPageTitle() {
    if($(window).width() < 1480) {
      $('header p.header-title').html(short_title);
    } else {
      $('header p.header-title').html(long_title);
    }
  }

  $('header .header-more').click(function(event) {
    var $menu = $('div.header-more-menu');
    var $overlay = $('div.header-more-menu-overlay');
    $menu.show({duration: 200});
    $overlay.css('display', 'block');
  });

  $('div.header-more-menu-overlay').on('touchstart mousedown click', function(event) {
    $('div.header-more-menu').fadeOut({duration: 200});
    $(this).css('display', 'none');
  });

  /* NAVIGATION */

  $('nav ul.list li.' + short_title + ' p').css('color', '#2196F3');
  $('nav ul.list li.' + short_title + ' i').css('color', '#2196F3');
  $('nav ul.list li.' + short_title).css('background-color', '#EEEEEE');

  $('nav').css('width', getNavDrawerWidth());

  $(window).resize(function(event) {
    setPageTitle();/* HEADER-TITLE */

    $('nav').css('width', getNavDrawerWidth());
    if($(window).width() >= 1480) {
      if($('.nav-overlay').css('display') == 'block') {
        $('nav').removeAttr('style');
        setTimeout(function() {
          $('nav').css('width', getNavDrawerWidth());
        }, 20);
        $('div.nav-overlay').removeAttr('style');
      }
    }
  });

  function getNavDrawerWidth() {
    var nav_width = 0;
    if($(window).width() < 800) {
      nav_width = $(window).width() - 56;
      if(nav_width > 280) {
        nav_width = 280;
      }
    } else if($(window).width() < 1480) {
      nav_width = $(window).width() - 64;
      if(nav_width > 320) {
        nav_width = 320;
      }
    } else {
      nav_width = 256;
    }
    return nav_width + "px";
  }

  $('header div.header-menu').click(function(event) {
    if($(window).width() < 1480) {
      $('nav').css('left', '0');
      $('div.nav-overlay').css('display', 'block');
      setTimeout(function() {
      $('div.nav-overlay').css('opacity', '1');
      }, 20);
    }
  });

  $('div.nav-overlay').on('touchstart mousedown click', function(event) {
    if($(window).width() < 1480) {
      $('nav').css('left', '-330px');
      $('div.nav-overlay').css('opacity', '0');
      setTimeout(function() {
        $('div.nav-overlay').removeAttr('style');
        setTimeout(function() {
          $('nav').removeAttr('style');
          setTimeout(function() {
            $('nav').css('width', getNavDrawerWidth());
          }, 20);
        }, 100);
      }, 300);
    } else {
      $('nav').removeAttr('style');
      setTimeout(function() {
        $('nav').css('width', getNavDrawerWidth());
      }, 20);
      $('div.nav-overlay').removeAttr('style');
    }
    return false;
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

    if(xDown > 50) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if ( xDiff < 0 ) {
        $('nav').css('left', '0');
        $('div.nav-overlay').css('display', 'block');
        setTimeout(function() {
          $('div.nav-overlay').css('opacity', '1');
        }, 20);
      }
    }

    xDown = null;
    yDown = null;
  }

});

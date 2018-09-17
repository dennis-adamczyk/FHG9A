$(document).ready(function() {

  if(short_title !== 'Berlin') {
    $('header').prepend('<div class="back" onclick="window.location = \'/berlin/\'"><i class="material-icons">arrow_back</i></div>');
    $('header div.header-menu').remove();
    Waves.attach('header div.back', ['waves-light']);
  }

  if(short_title !== 'Resultat' && short_title !== 'Abstimmung') {
    $.getJSON('/berlin/vote/js/result.json', function(result, textStatus) {
      if(result.voted.length <= 24) {
        $('body').append(`
        <div class="vote" onclick="window.location = '/berlin/vote'">
          <p>Stimme abgeben</p><i class="material-icons">chevron_right</i>
        </div>`);
      } else {
        $('body').append(`
        <div class="vote disabled" onclick="window.location = '/berlin/vote/results/'">
          <p>Abstimmung beendet</p>
        </div>`);
      }
    });
  }

  var activeImg, imgUrl;

  $('div.galery img').click(function(event) {
    imgUrl = $(this).attr('src');
    $('div.lightbox-overlay div.lightbox img').attr('src', imgUrl);
    $('div.lightbox-overlay').css('display', 'block');
    setTimeout(function() {
      $('div.lightbox-overlay').css('opacity', '1');
    }, 10);
    activeImg = $(this);
  });

  $('div.lightbox-overlay div.lightbox div.close').click(function(event) {
    $('div.lightbox-overlay').css('opacity', '0');
    setTimeout(function() {
      $('div.lightbox-overlay').css('display', 'none');
    }, 180);
  });

  $('div.lightbox-overlay div.lightbox div.left').click(function(event) {
    PrevImg(activeImg);
  });

  $('div.lightbox-overlay div.lightbox div.right').click(function(event) {
    NextImg(activeImg);
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
      if ( xDiff < 0 ) {
        if($('div.lightbox-overlay').css('opacity') == '1') {
          PrevImg(activeImg);
        }
      }
      if ( xDiff > 0 ) {
        if($('div.lightbox-overlay').css('opacity') == '1') {
          NextImg(activeImg);
        }
      }
    }

    xDown = null;
    yDown = null;
  }

  function NextImg(img) {
    if($(img).next().is('img')) {
      activeImg = $(img).next();
      imgUrl = $(img).next('img').attr('src');
      $('div.lightbox-overlay div.lightbox img').attr('src', imgUrl);
    } else {
      activeImg = $(img).parent().children('img').first();
      imgUrl = $(img).parent().children('img').first().attr('src');
      $('div.lightbox-overlay div.lightbox img').attr('src', imgUrl);
    }
  }

  function PrevImg(img) {
    if($(img).prev().is('img')) {
      activeImg = $(img).prev();
      imgUrl = $(img).prev('img').attr('src');
      $('div.lightbox-overlay div.lightbox img').attr('src', imgUrl);
    } else {
      activeImg = $(img).parent().children('img').last();
      imgUrl = $(img).parent().children('img').last().attr('src');
      $('div.lightbox-overlay div.lightbox img').attr('src', imgUrl);
    }
  }

});

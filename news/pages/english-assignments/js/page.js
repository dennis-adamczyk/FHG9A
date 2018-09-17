$(document).ready(function () {

  String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
  };

  String.prototype.htmlifyLineBreaks = function() {
    var target = this;
    this.replace(/(?:\r\n|\r|\n)/g, '<br>');
    return target.replace(/(?:\r\n|\r|\n)/g, '<br>');
  };

  String.prototype.countSearch = function(search) {
    var target = this;
    return target.indexOf(search) === -1 ? 0 : target.split(search).length - 1;
  };

  var menuSymbol = $('header .header-menu').css('display') == 'block';

  $.ajaxSetup({
    async: false
  });

  function getHeadlines() {
    var output = [];
    $.getJSON("js/assignments.json", function (data, textStatus, jqXHR) {
        for (var key in data) {
          output.push('<li>' + key + '</li>');
        }
      }
    );
    return output.join('');
  }

  function getValue(key) {
    var output = null;
    $.getJSON("js/assignments.json", function (data, textStatus, jqXHR) {
      for (var r_key in data) {
        if(r_key == key) {
          output = data[r_key];

          output = output.htmlifyLineBreaks();
          output = output.replace(/[*](\S.*?\S)[*]/g, '<b>$1</b>');
          output = output.replace(/[_](\S.*?\S)[_]/g, '<i>$1</i>');
          output = output.replace(/[~](\S.*?\S)[~]/g, '<u>$1</u>');
        }
      }
    });
    return output;
  }

  function loadHeadlines() {
    $('header div.back').hide();
    if(menuSymbol)
      $('header div.header-menu').show();

    $('div.content div.assignments div.top p').text('Assignments for "Among the Hidden"');

    var appendList = '<ul>';
    appendList += getHeadlines();
    appendList += '</ul>';
    
    $('div.content div.assignments div.body').html(appendList);

    $('div.content div.assignments div.body ul li').each(function(element) {
      $(this).click(function (e) { 
        loadValue($(this).text());
      });
    });
  }

  function loadValue(key) {
    $('header').prepend('<div class="back"><i class="material-icons">arrow_back</i></div>');
    $('header div.back').click(function(e) {
      loadHeadlines();
    });
    $('header div.header-menu').hide();
    Waves.attach('header div.back', ['waves-light']);

    $('div.content div.assignments div.top p').text(key);
    $('div.content div.assignments div.body').html('<p class="value">' + getValue(key) + '</p>');
  }

  loadHeadlines();

});
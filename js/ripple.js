$(document).ready(function() {

  var config = {
    duration: 250
  };

  Waves.attach('header .header-menu', ['waves-light']);
  Waves.attach('header .header-notifications', ['waves-light']);
  Waves.attach('header .header-more', ['waves-light']);
  Waves.attach('div.header-more-menu ul li', ['waves-block']);

  Waves.attach('nav ul.list li.list-item');

  Waves.attach('div.content div.schedule div.top div.left i');
  Waves.attach('div.content div.schedule div.top div.right i');
  Waves.attach('div.content div.schedule div.top div#switch-view i');

  Waves.attach('div.content div.homework div.top div.more i');
  Waves.attach('div.content div.dates div.top div.more i');

  Waves.attach('div.popup div.buttons div.ok');

  Waves.attach('div.content div.homework div.top div.left i');
  Waves.attach('div.content div.homework div.top div.right i');

  Waves.attach('div.content div.dates div.top div.left i');
  Waves.attach('div.content div.dates div.top div.right i');

  Waves.attach('div.content div.login div.body form#login button', ['waves-button', 'waves-light']);

  Waves.attach('div.content div.schedule-admin div.top div.back i');
  Waves.attach('div.content div.schedule-admin div.top div.add i');
  Waves.attach('div.content div.schedule-admin div.top div.autoincrement i');

  Waves.attach('div.content div.homework-admin div.top div.back i');
  Waves.attach('div.content div.homework-admin div.top div.left i');
  Waves.attach('div.content div.homework-admin div.top div.right i');

  Waves.attach('div.content div.dates-admin div.top div.back i');
  Waves.attach('div.content div.dates-admin div.top div.add i');
  Waves.attach('div.content div.dates-admin div.top div.autoincrement i');

  Waves.attach('div.content div.sync div.body button', ['waves-light']);

  Waves.attach('div.intro div.next');
  Waves.attach('div.intro div.prev');

  Waves.attach('div.lightbox-overlay div.lightbox div.close', ['waves-light']);
  Waves.attach('div.lightbox-overlay div.lightbox div.left', ['waves-light']);
  Waves.attach('div.lightbox-overlay div.lightbox div.right', ['waves-light']);

  Waves.attach('div.content div.reload');
  Waves.init(config);

});

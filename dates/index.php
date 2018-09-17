<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Termine";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Termine';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Termine</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="popup">
      <p class="title">9. April 2018</p>
      <div class="body">
        <div class="group">
          <p class="key">Termin</p>
          <p class="value">Erster Schultag nach den Ferien</p>
        </div>
      </div>
      <div class="buttons">
        <div class="ok">
          <p>OK</p>
        </div>
      </div>
    </div>
    <div class="popup-overlay"></div>

    <div class="content">
      <div class="extended-header"></div>

      <div class="dates">
        <div class="top">
          <div class="left">
            <i class="material-icons">keyboard_arrow_left</i>
          </div>
          <p></p>
          <div class="right">
            <i class="material-icons">keyboard_arrow_right</i>
          </div>
        </div>
        <div class="body">

        </div>
      </div>

    </div>
  </body>
</html>

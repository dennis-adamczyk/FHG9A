<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Fehler 404";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Fehler 404';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Fehler 404</title>
    <link rel="stylesheet" href="/error/404/css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="offline">
        <i class="material-icons">error</i>
        <p>Fehler 404<br />Seite nicht gefunden</p>
      </div>

    </div>
  </body>
</html>

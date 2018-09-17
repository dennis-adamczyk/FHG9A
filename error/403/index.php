<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Fehler 403";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Fehler 403';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Fehler 403</title>
    <link rel="stylesheet" href="/error/403/css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="offline">
        <i class="material-icons">error</i>
        <p>Fehler 403<br />Mangelnde Berechtigung</p>
      </div>

    </div>
  </body>
</html>

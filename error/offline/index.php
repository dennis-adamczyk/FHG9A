<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Offline";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Offline';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Offline</title>
    <link rel="stylesheet" href="/error/offline/css/page.css" />
    <meta http-equiv="refresh" content="5">
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="offline">
        <i class="material-icons">cloud_off</i>
        <p>Kein Internet</p>
      </div>

    </div>
  </body>
</html>

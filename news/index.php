<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Aktuelles";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Aktuelles';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Aktuelles</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="news">
        <div class="top">
          <p>Aktuelle Inhalte</p>
        </div>
        <div class="body">
          <ul>
            <li onclick="window.location = '/berlin'">Abschlusspullis/-shirts Designs</li>
            <li onclick="window.location = '/news/pages/english-assignments'">English Assignments</li>
          </ul>
        </div>
      </div>

    </div>
  </body>
</html>

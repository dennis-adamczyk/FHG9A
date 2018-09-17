<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Resultat";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Berlin <i class="material-icons">keyboard_arrow_right</i> Resultat';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Berlin > Resultat</title>
    <link rel="stylesheet" href="../../css/page.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
    <script src="/berlin/js/page.js" /></script>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="reload" onclick="location.reload(true);">
        <i class="material-icons">refresh</i>
      </div>

      <div class="results">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>

    </div>
  </body>
</html>

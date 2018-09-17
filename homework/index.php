<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Hausaufgaben";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Hausaufgaben';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Hausaufgaben</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="homework">
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

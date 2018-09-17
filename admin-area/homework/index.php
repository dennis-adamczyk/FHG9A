<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Hausaufgaben verwalten";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Admin Bereich <i class="material-icons">keyboard_arrow_right</i> Hausaufgaben verwalten';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Admin Bereich > Hausaufgaben</title>
    <link rel="stylesheet" href="css/page.css" />
    <? if($_SESSION["login"] !== "Admin") { header("location: /admin-area/login "); } ?>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="homework-admin">
        <div class="top">
          <div class="back">
            <i class="material-icons" onclick="window.location = '/admin-area'">arrow_back</i>
          </div>
          <p></p>
            <div class="left">
              <i class="material-icons">keyboard_arrow_left</i>
            </div>
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

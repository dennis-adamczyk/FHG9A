<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Admin Bereich";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Admin Bereich';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Admin Bereich</title>
    <link rel="stylesheet" href="css/page.css" />
    <? if($_SESSION["login"] !== "Admin") { header("location: /admin-area/login "); } ?>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="menu">
        <div class="top">
          <p>Wähle eine Aktion aus</p>
        </div>
        <div class="body">
          <ul>
            <li onclick="window.location = '/admin-area/schedule'"><i class="material-icons">schedule</i>Stundenplan verwalten</li>
            <li onclick="window.location = '/admin-area/homework'"><i class="material-icons">school</i>Hausaufgaben verwalten</li>
            <li onclick="window.location = '/admin-area/dates'"><i class="material-icons">date_range</i>Termine verwalten</li>
            <li onclick="window.location = '/admin-area/english-assignments'" style="font-size: 15px;"><i class="material-icons">list</i>English Assignments verwalten</li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>

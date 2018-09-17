<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Assignments verwalten";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Admin Bereich <i class="material-icons">keyboard_arrow_right</i> Englisch Assignments verwalten';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Admin Bereich > Englisch Assignments</title>
    <link rel="stylesheet" href="css/page.css" />
    <link rel="stylesheet" href="jsoneditor/jsoneditor.min.css" />
    <? if($_SESSION["login"] !== "Admin") { if($_SESSION["login"] !== "Lehrer") {header("location: /admin-area/login ");} } ?>
    <script src="jsoneditor/jsoneditor.min.js"></script>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="english-assignments-admin">
        <div class="top">
          <div class="back">
            <i class="material-icons" onclick=<? if($_SESSION["login"] === "Admin") { echo("\"window.location = '/admin-area'\""); } else {echo("\"window.location = '/'\"");} ?>>arrow_back</i>
          </div>
          <p>Englisch Assignmnets verwalten</p>
        </div>
        <div class="body">
          <div id="jsoneditor" style="width: 100%; max-height: auto; height: 450px; min-height: 450px;"></div>
        </div>
      </div>
    </div>
  </body>
</html>

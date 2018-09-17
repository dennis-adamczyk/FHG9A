<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Stundenplan verwalten";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Admin Bereich <i class="material-icons">keyboard_arrow_right</i> Stundenplan verwalten';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Admin Bereich > Stundenplan</title>
    <link rel="stylesheet" href="css/page.css" />
    <? if($_SESSION["login"] !== "Admin") { header("location: /admin-area/login "); } ?>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="popup">
      <p class="title">Auto_Increment</p>
      <div class="body">
        <div class="group">
          <input type="number" />
        </div>
      </div>
      <div class="buttons">
        <div class="ok">
          <p>SPEICHERN</p>
        </div>
      </div>
    </div>
    <div class="popup-overlay"></div>

    <div class="content">
      <div class="extended-header"></div>

      <div class="schedule-admin">
        <div class="top">
          <div class="back">
            <i class="material-icons" onclick="window.location = '/admin-area'">arrow_back</i>
          </div>
          <p>Stundenplan verwalten</p>
          <div class="add">
            <i class="material-icons">add</i>
          </div>
          <div class="autoincrement">
            <i class="material-icons">format_list_numbered</i>
          </div>
        </div>
        <div class="body">
          <table>
            <thead>
              <th><i class="material-icons checkbox">check_box_outline_blank</i></th>
              <th>ID</th>
              <th>tag</th>
              <th>stunde</th>
              <th>fach</th>
              <th>kurz</th>
              <th>raum</th>
              <th>lehrer</th>
              <th>farbe</th>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </body>
</html>

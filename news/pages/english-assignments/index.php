<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "English Assignments";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Aktuelles <i class="material-icons">keyboard_arrow_right</i> English Assignments';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Aktuelles > English Assignments</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="assignments">
        <div class="top">
          <p>Assignments for "Among the Hidden"</p>
        </div>
        <div class="body">
        </div>
      </div>

    </div>
  </body>
</html>

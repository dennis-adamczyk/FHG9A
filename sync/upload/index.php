<? $root = realpath($_SERVER["DOCUMENT_ROOT"]); ?>
<script>
  var short_title = "Code generieren";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Geräte synchronisieren <i class="material-icons">keyboard_arrow_right</i> Code generieren';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Synchronisieren > Code generieren</title>
    <link rel="stylesheet" href="css/page.css" />
    <script src="js/md5.min.js"></script>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="sync">
        <div class="top">
          <p>Synchronisierungscode generieren</p>
        </div>
        <div class="body">
          <p>Dein Synchronisierungscode wurde erstellt.</p>
          <p>Gib den unten stehenden Code bei dem Zielgerät ein um das Zielgerät mit diesem Gerät zu synchronisieren. Öffne dazu bei dem Zielgerät das Synchronisierungsmenü und wähle den Punkt "<i class="material-icons">file_download</i> Dieses Gerät synchronisieren".</p>
          <div class="code">
            <p>...</p>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>

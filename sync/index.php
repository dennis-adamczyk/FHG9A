<? $root = realpath($_SERVER["DOCUMENT_ROOT"]); ?>
<script>
  var short_title = "Geräte synchronisieren";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Geräte synchronisieren';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Synchronisieren</title>
    <link rel="stylesheet" href="css/page.css" />
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
            <li onclick="window.location = '/sync/upload'"><i class="material-icons">file_upload</i>Synchronisierungscode generieren</li>
            <li onclick="window.location = '/sync/download'"><i class="material-icons">file_download</i>Dieses Gerät synchronisieren</li>
          </ul>
        </div>
      </div>
    </div>
  </body>
</html>

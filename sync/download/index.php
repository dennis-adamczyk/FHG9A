<? $root = realpath($_SERVER["DOCUMENT_ROOT"]); ?>
<script>
  var short_title = "Code eingeben";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Geräte synchronisieren <i class="material-icons">keyboard_arrow_right</i> Code eingeben';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Synchronisieren > Code eingeben</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="sync">
        <div class="top">
          <p>Dieses Gerät synchronisieren</p>
        </div>
        <div class="body">
          <p>Bitte gib in das unten stehende Feld den Synchronisierungscode, der dir auf deinem anderen Gerät angezeigt wird, ein.</p>
          <p>Öffne dazu bei dem Gerät, von welchem du die Daten empfangen willst, das Synchronisierungsmenü und wähle den Punkt "<i class="material-icons">file_upload</i> Synchronisierungscode generieren".</p>
          <div class="code">
            <input type="text" maxlength="16" />
          </div>
          <button>Jetzt synchronisieren</button>
        </div>
      </div>
    </div>
  </body>
</html>

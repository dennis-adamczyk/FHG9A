<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Abstimmung";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Berlin <i class="material-icons">keyboard_arrow_right</i> Abstimmung';
  var ip_adress = '<? echo($_SERVER['REMOTE_ADDR']); ?>';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Berlin > Abstimmung</title>
    <link rel="stylesheet" href="../css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="voting">
        <p>Wähle eines der folgenden Abschlusspullis/-shirts</p>
        <fieldset class="select">
          <label>
            <input type="radio" name="vote" value="bH" />
            <p>Schwarzer Hoodie</p>
          </label>
          <label>
            <input type="radio" name="vote" value="wH" />
            <p>Weißer Hoodie</p>
          </label>
          <label>
            <input type="radio" name="vote" value="bT" />
            <p>Schwarzes T-Shirt</p>
          </label>
          <label>
            <input type="radio" name="vote" value="wT" />
            <p>Weißes T-Shirt</p>
          </label>
        </fieldset>
        <button>ANONYM SENDEN</button>
      </div>

    </div>
  </body>
</html>

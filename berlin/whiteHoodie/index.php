<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Weißer Hoodie";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Berlin <i class="material-icons">keyboard_arrow_right</i> Weißer Hoodie';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Berlin > Weißer Hoodie</title>
    <link rel="stylesheet" href="../css/page.css" />
    <script src="../js/page.js" /></script>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="lightbox-overlay">
      <div class="lightbox">
        <div class="close">
          <i class="material-icons">close</i>
        </div>
        <img />
        <div class="left">
          <i class="material-icons">chevron_left</i>
        </div>
        <div class="right">
          <i class="material-icons">chevron_right</i>
        </div>
      </div>
    </div>

    <div class="content">

      <div class="galery">
        <img src="/berlin/img/WhiteHoodie/Vorne.png" />
        <img src="/berlin/img/WhiteHoodie/Hinten.png" />
        <img src="/berlin/img/WhiteHoodie/Links.png" />
        <img src="/berlin/img/WhiteHoodie/Rechts.png" />
        <img src="/berlin/img/WhiteHoodie/KapuzeLinks.png" />
        <img src="/berlin/img/WhiteHoodie/KapuzeRechts.png" />
        <p><b>Kosten:</b> 15,69 €/Stück</p>
      </div>

    </div>
  </body>
</html>

<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Berlin";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Berlin';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Berlin</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="categorys">
        <div class="folder" onclick="window.location = '/berlin/whiteHoodie/'">
          <img src="img/WhiteHoodie/Vorne.png" />
          <p>Weißer Hoodie</p>
        </div>
        <div class="folder" onclick="window.location = '/berlin/whiteTShirt/'">
          <img src="img/WhiteTShirt/Männer/Vorne.png" />
          <p>Weißes T-Shirt</p>
        </div>
      </div>

    </div>
  </body>
</html>

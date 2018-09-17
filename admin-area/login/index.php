<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Admin Login";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Admin Login';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Admin Login</title>
    <link rel="stylesheet" href="css/page.css" />
    <? if($_SESSION["login"] == "Admin") { header("location: /admin-area/"); } else if($_SESSION["login"] == "Lehrer") { header("location: /admin-area/english-assignments/"); } ?>
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="login">
        <div class="top">
          <p>LOGIN</p>
        </div>
        <div class="body">
          <form action="javascript:void(0);" method="post" autocomplete="off" id="login" novalidate>
            <div class="input-group">
              <input type="password" class="form-control" id="password" name="password" required mozactionhint="next" form="login" tabindex="1" />
              <label for="name">Passwort</label>
              <label for="name" class="error"></label>
            </div>

            <button tabindex="2">Einloggen</button>
          </form>
        </div>
      </div>

    </div>
  </body>
</html>

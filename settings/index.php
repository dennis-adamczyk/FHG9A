<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Einstellungen";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Einstellungen';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Einstellungen</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">

      <div class="schedule box">
        <p>Stundenplan</p>
        <div class="settingsBox">
          <ul>
            <li class="toggle" id="spanisch">
              <p class="main">Spanisch</p>
              <p class="secondary">Aktiviert zusätzliche Spanischstunden</p>
              <label class="toggle">
                <input type="checkbox" />
                <span class="roundbutton"></span>
              </label>
            </li>
            <li class="choose" id="fs2">
              <p class="main">2. Fremdsprache</p>
              <p class="secondary">Französich oder Latein</p>
              <ul class="choose" id="fs2_choose">
                <li data-value="none">Nicht gesetzt</li>
                <li data-value="f">Französisch</li>
                <li data-value="l">Latein</li>
              </ul>
            </li>
            <li class="choose" id="religion">
              <p class="main">Religion</p>
              <p class="secondary">Evangelisch, katholisch oder Philosophie</p>
              <ul class="choose">
                <li data-value="none">Nicht gesetzt</li>
                <li data-value="er">Evangelische Religion</li>
                <li data-value="kr">Katholische Relogion</li>
                <li data-value="ppl">Philosophie</li>
              </ul>
            </li>
            <li class="choose" id="wp">
              <p class="main">Wahlpflichtfach</p>
              <p class="secondary">Technik, Informatik, Wirtschaft, Kunst/Design, ...</p>
              <ul class="choose">
                <li data-value="none">Nicht gesetzt</li>
                <li data-value="tech">Technik</li>
                <li data-value="info">Informatik</li>
                <li data-value="wa">Wirtschaft</li>
                <li data-value="ku-d">Kunst/Design</li>
                <li data-value="s">Spanisch</li>
                <li data-value="ern">Ernährungslehre</li>
              </ul>
            </li>
            <li class="toggle" id="farben">
              <p class="main">Farben</p>
              <p class="secondary">Aktiviert farblich hinterlegte Stunden</p>
              <label class="toggle">
                <input type="checkbox" />
                <span class="roundbutton"></span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="dates box">
        <p>Termine</p>
        <div class="settingsBox">
          <ul>
            <li class="choose" id="limit">
              <p class="main">Termin-Limit auf Startseite</p>
              <p class="secondary">5 Termine gleichzeitig</p>
              <ul class="choose">
                <li data-value="3">3 Termine</li>
                <li data-value="4">4 Termine</li>
                <li data-value="5">5 Termine</li>
                <li data-value="6">6 Termine</li>
                <li data-value="7">7 Termine</li>
                <li data-value="8">8 Termine</li>
                <li data-value="9">9 Termine</li>
                <li data-value="10">10 Termine</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!--

        Stundenplan
          Spanisch aktiviert O-O
          2. Fremdsprache = X/Französisch/Latein
          Religion = X/Evangelische Religion/Katholische Religion/Philosophie
          Wahlpflichtfach = X/Technik/Informatik/Wirtschaft|Arbeitswelt/Kunst|Design/Spanisch/Ernährungswissenschaft

        Termine
          Termin-Limit auf der Startseite = <5>


      -->

    </div>
  </body>
</html>

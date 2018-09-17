<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Start";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Start';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Start</title>
    <meta name="keywords" content="fhg9a, fhg, 9a, fhg 9a, fhg9a.tk, fhg9a tk" />
    <meta name="description" content="FHG9A.tk - Die Internetseite der Klasse 9A vom FHG / Franz-Haniel-Gymnasium. Hier können die Schüler Stundenplan nachgrucken, Hausaufgaben checken und Termine einsehen." />
    <meta name="robots" content="index,follow"  />
    <link rel="stylesheet" href="/css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="content">
      <div class="extended-header"></div>

      <div class="schedule card">
        <div class="top">
          <div class="left"><i class="material-icons">chevron_left</i></div>
          <p id="schedule_day">Montag</p>
          <div class="right"><i class="material-icons">chevron_right</i></div>
        </div>
        <div class="list">
          <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
          </div>
          <ul>
          </ul>
        </div>
      </div>

      <div class="homework card">
        <div class="top">
          <p>Aktuelle Hausaufgaben</p>
          <div class="more"><i class="material-icons" onclick="window.location = '/homework'">more_horiz</i></div>
        </div>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th><i class="material-icons checkbox">check_box_outline_blank</i></th>
                <th>Stunde</th>
                <th>Fach</th>
                <th>Aufgabe</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>

      <div class="dates card">
        <div class="top">
          <p>Nächste Termine</p>
          <div class="more"><i class="material-icons" onclick="window.location = '/dates'">more_horiz</i></div>
        </div>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th>Datum</th>
                <th>Bezeichnung</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </body>
</html>

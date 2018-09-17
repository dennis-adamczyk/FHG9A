<? $root = realpath($_SERVER["DOCUMENT_ROOT"]);
session_start(); ?>
<script>
  var short_title = "Stundenplan";
  var long_title = 'FHG9A <i class="material-icons">keyboard_arrow_right</i> Stundenplan';
</script>
<!DOCTYPE html>
<html lang="de">
  <head>
    <? include "$root/includes/head.php"; ?>
    <title>FHG9A > Stundenplan</title>
    <link rel="stylesheet" href="css/page.css" />
  </head>
  <body>

    <? include "$root/includes/header.php"; ?>
    <? include "$root/includes/nav.php"; ?>

    <div class="popup">
      <p class="title">Geschichte</p>
      <div class="body">
        <div class="group">
          <p class="key">Abkürzung</p>
          <p class="value">Ge</p>
        </div>
        <div class="group">
          <p class="key">Raum</p>
          <p class="value">701</p>
        </div>
        <div class="group">
          <p class="key">Lehrer</p>
          <p class="value">Hinkel</p>
        </div>
        <div class="group">
          <p class="key">Kürzel</p>
          <p class="value">HI</p>
        </div>
        <div class="group">
          <p class="key">Farbe</p>
          <p class="value color">.</p>
        </div>
      </div>
      <div class="buttons">
        <div class="ok">
          <p>OK</p>
        </div>
      </div>
    </div>
    <div class="popup-overlay"></div>

    <div class="content">
      <div class="extended-header"></div>

      <div class="schedule<? if($_GET['view'] == 'day') echo(' dayView'); ?>">
      <? if ($_GET['view'] == 'day') { ?>
          <div class="top">
            <p>Tagesansicht</p>
            <div id="switch-view">
              <i class="material-icons" onclick="window.location = './'">view_week</i>
            </div>
          </div>
          <div class="body">
            <p class="day">Montag</p>
            <table>
              <thead>
                <tr>
                  <th>Stunde</th>
                  <th>Zeit</th>
                  <th>Fach</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>

            <p class="day">Dienstag</p>
            <table>
              <thead>
                <tr>
                  <th>Stunde</th>
                  <th>Zeit</th>
                  <th>Fach</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>

            <p class="day">Mittwoch</p>
            <table>
              <thead>
                <tr>
                  <th>Stunde</th>
                  <th>Zeit</th>
                  <th>Fach</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>

            <p class="day">Donnertag</p>
            <table>
              <thead>
                <tr>
                  <th>Stunde</th>
                  <th>Zeit</th>
                  <th>Fach</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>

            <p class="day">Freitag</p>
            <table>
              <thead>
                <tr>
                  <th>Stunde</th>
                  <th>Zeit</th>
                  <th>Fach</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
      <? } else { ?>
        <div class="top">
          <p>Wochenansicht</p>
          <div id="switch-view">
            <i class="material-icons" onclick="window.location = './?view=day'">view_day</i>
          </div>
        </div>
        <div class="body">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Montag</th>
                <th>Dienstag</th>
                <th>Mittwoch</th>
                <th>Donnertag</th>
                <th>Freitag</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>7.55 - 9.05</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>9.15 - 10.25</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>10.45 - 11.55</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>12.05 - 13.15</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>14.15 - 15.25</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      <? } ?>
      </div>

    </div>
  </body>
</html>

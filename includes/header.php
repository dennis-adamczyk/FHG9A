<header>
  <div class="header-menu"title="Menü"><i class="material-icons">menu</i></div>
  <p class="header-title" onselectstart="return false"></p>
  <div class="header-more" title="Optionen"><i class="material-icons">more_vert</i></div>
</header>
<div class="header-more-menu-overlay"></div>
<div class="header-more-menu">
  <ul>
    <li onclick="window.location = '/sync/'">
      <p>Geräte synchronisieren</p>
    </li>
    <li onclick="window.location = '/admin-area/'">
      <p>Administrationsbereich</p>
    </li>
    <? if (isset($_SESSION["login"])) { ?>
    <li onclick="window.location='/admin-area/login/logout.php'">
      <p>Abmelden</p>
    </li>
    <? } ?>
  </ul>
</div>

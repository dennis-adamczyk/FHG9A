<?php
  $fp = fopen('../js/assignments.json', 'w') or die('ERROR');
  fwrite($fp, $_POST['data']);
  fclose($fp);
?>

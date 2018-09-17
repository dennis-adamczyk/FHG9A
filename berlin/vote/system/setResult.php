<?php
  $fp = fopen('../js/result.json', 'w') or die('ERROR');
  fwrite($fp, $_POST['data']);
  fclose($fp);
?>

<?php
  $fp = fopen('js/result.json', 'w') or die('ERROR');
  fwrite($fp, '{
    "voting": {
      "bH": 0,
      "wH": 0,
      "bT": 0,
      "wT": 0
    },
    "voted": []
  }');
  fclose($fp);
?>

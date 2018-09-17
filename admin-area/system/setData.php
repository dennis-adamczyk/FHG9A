<?
include '../../system/connect.php';

$table = $_POST['table'];
$rows = json_decode($_POST['data']);

foreach ($rows as $value) {

  $sql = "INSERT INTO $table VALUES ";
  $sql .= "(";

  foreach($value as $data) {
    $data = $conn->real_escape_string($data);
    if(is_int($data)) {
      $sql .= "$data, ";
    } else if($data == 'CURRENT_TIMESTAMP') {
      $sql .= "null, ";
    } else {
      $sql .= "'" . $data . "', ";
    }
  }
  $sql = substr($sql, 0, -2);
  $sql .= ")";

  $conn->query($sql);
}

$conn->close();

?>

<?
include '../../system/connect.php';

$table = $_POST['table'];
$rows = json_decode($_POST['data']);
$where = json_decode($_POST['where']);

foreach ($rows as $value) {

  $sql = "UPDATE $table SET ";

  foreach($value as $column => $data) {
    $sql .= "$column = '" . $conn->real_escape_string($data) . "', ";
  }
  $sql = substr($sql, 0, -2);
  $sql .= " WHERE ";



  foreach ($where as $key => $val) {
    $sql .= "$key = '" . $conn->real_escape_string($val) . "' AND ";
  }
  $sql = substr($sql, 0, -5);
  var_dump($sql);
  $conn->query($sql);
}


$conn->close();

?>

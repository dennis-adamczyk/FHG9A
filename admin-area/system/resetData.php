<?
include '../../system/connect.php';

$table = $_POST['table'];
$rows = json_decode($_POST['data']);

$sql = "DELETE FROM $table";
$conn->query($sql);


foreach ($rows as $value) {

  $sql = "INSERT INTO $table VALUES ";
  $sql .= "(";

  foreach($value as $data) {
    $sql .= "'" . $conn->real_escape_string($data) . "', ";
  }
  $sql = substr($sql, 0, -2);
  $sql .= ")";

  $conn->query($sql);
}

$conn->close();

?>

<?
include '../../system/connect.php';

$table = $_POST['table'];
$data = json_decode($_POST['data']);

$sql = "DELETE FROM $table WHERE ";

foreach ($data as $key => $value) {
  $sql .= "$key = '" . $conn->real_escape_string($value) . "' AND ";
}
$sql = substr($sql, 0, -5);
$sql .= ";";

echo($sql);

$query = $conn->query($sql);

$conn->close();

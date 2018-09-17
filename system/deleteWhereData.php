<?
include 'connect.php';

$table = $_POST['table'];
$where = $_POST['where'];

$sql = "DELETE FROM $table WHERE " . $where;
$query = $conn->query($sql);

$conn->close();

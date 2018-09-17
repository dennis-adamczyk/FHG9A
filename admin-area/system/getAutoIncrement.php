<?
include '../../system/connect.php';

$table = $_POST['table'];

$sql = "SELECT `AUTO_INCREMENT` FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '$dbname' AND TABLE_NAME = '$table'";
$result = $conn->query($sql)->fetch_array(MYSQLI_ASSOC);
echo(json_encode($result));

$conn->close();

<?
include '../../system/connect.php';

$table = $_POST['table'];
$autoincrement = intval($_POST['autoincrement']);

$sql = "ALTER TABLE $table AUTO_INCREMENT = $autoincrement";
$conn->query($sql);

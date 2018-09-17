<?
include 'connect.php';

$stunde = $_POST['stunde'];

$sql = "SELECT * FROM schedule WHERE stunde = $stunde";
$query = $conn->query($sql);

$lessons = array();
while ($row = $query->fetch_row()) {
  $lessons[] = $row[1] . "||" . $row[3] . "||" . $row[4] . "||" . $row[5] . "||" . $row[6] . "||" . $row[7];
}
$query->close();
echo json_encode($lessons);

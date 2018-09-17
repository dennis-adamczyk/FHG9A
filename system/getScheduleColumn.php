<?
include 'connect.php';

$tag = $_POST['tag'];

$sql = "SELECT * FROM schedule WHERE tag = $tag";
$query = $conn->query($sql);

$lessons = array();
while ($row = $query->fetch_row()) {
  $lessons[] = $row[2] . "||" . $row[3] . "||" . $row[4] . "||" . $row[5] . "||" . $row[6] . "||" . $row[7];
}
$query->close();
echo json_encode($lessons);

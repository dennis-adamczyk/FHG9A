<?
include 'connect.php';

$datum = $_POST['datum'];

$sql = "SELECT * FROM homeworkHistory WHERE datum = '$datum'";
$query = $conn->query($sql);

$homework = array();
while ($row = $query->fetch_row()) {
  $sql2 = "SELECT kurz FROM schedule WHERE fach = '" . $row[3] . "'";
  $kurz = $conn->query($sql2)->fetch_array(MYSQLI_ASSOC);

  $homework[] = $row[2] . "||" . $row[3] . "||" . $kurz['kurz'] . "||" . $row[4];
  //            stunde            fach              kurz              aufgabe
}
$query->close();
echo json_encode($homework);

<?
include 'connect.php';

$datum = $_POST['datum'];

$sql = "SELECT * FROM dates WHERE datum = '$datum'";
$query = $conn->query($sql);

$dates = array();
while ($row = $query->fetch_row()) {
  $dates[] = $row[2];
}
$query->close();
echo json_encode($dates);

<?
include 'connect.php';

$limit = intval($_POST['limit']);

$sql = "";
if($limit == null || $limit == 0) {
  $sql = "SELECT * FROM dates ORDER BY datum ASC";
} else {
  $sql = "SELECT * FROM dates WHERE datum >= CURDATE() ORDER BY datum ASC LIMIT $limit";
}

$query = $conn->query($sql);

$dates = array();
while ($row = $query->fetch_row()) {
  $dates[] = $row[1] . "||" . $row[2];
}
$query->close();

echo json_encode($dates);

$conn->close();

<?
include 'connect.php';

$table = $_POST['table'];

$sql = "SELECT * FROM $table";
$query = $conn->query($sql);

$data = array();
while ($row = $query->fetch_row()) {
  $output = '';
  foreach ($row as $value) {
    $output .= $value . '||';
  }
  $data[] = substr($output, 0, - 2);
}
$query->close();
echo json_encode($data);

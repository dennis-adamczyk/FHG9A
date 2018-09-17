<?
include 'connect.php';

$tag = $_POST['tag'];
$stunde = $_POST['stunde'];

$sql = "SELECT * FROM schedule WHERE tag = $tag and stunde = $stunde";
$result = $conn->query($sql)->fetch_array(MYSQLI_ASSOC);
echo json_encode($result);

$conn->close();

<?
include 'connect.php';

$table = $_POST['table'];
$where = $_POST['where'];

$sql = "SELECT * FROM $table WHERE " . $where;
$query = $conn->query($sql);

// echo($sql);

    error_reporting(0);
    set_error_handler('myErrorHandler');
    register_shutdown_function('fatalErrorShutdownHandler');
    function myErrorHandler($code, $message, $file, $line) {
      echo('null');
    }
    function fatalErrorShutdownHandler() {
      $last_error = error_get_last();
      if ($last_error['type'] === E_ERROR) {
        myErrorHandler(E_ERROR, $last_error['message'], $last_error['file'], $last_error['line']);
      }
    }

$result = $query->fetch_array(MYSQLI_ASSOC);
echo(json_encode($result));

$conn->close();

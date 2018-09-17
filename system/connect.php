<?

$servername = "localhost";
$username = "USERNAME";
$password = "PASSWORD";
$dbname = "fhg9a";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Verbindungsfehler zur Datenbank: " . $conn->connect_error);
}
$conn->set_charset("utf8");

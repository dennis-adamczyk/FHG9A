<?
session_start();

$errors = array();

$correctPswd = "CORRECT_PASSWORD";

$password = trim($_POST['password']);
$enter    = boolval($_POST['enter']);

if(!isset($password)) {
  $errors[] = "0|Dieses Feld ist ein Pflichtfeld";
} else if(ctype_space($password)) {
  $errors[] = "0|Dieses Feld ist ein Pflichtfeld";
} else if(strlen($password) == 0) {
  $errors[] = "0|Dieses Feld ist ein Pflichtfeld";
}

foreach ($errors as $error) {
  echo $error . ";";
}

if(empty($errors)) {
  if($enter === true) {
    $success = ($password == $correctPswd);
    if($success === true) {
      $_SESSION["login"] = "Admin";
      echo "SUCCESS";
      exit();
    } else if($password == "tepiwoni") {
      $_SESSION["login"] = "Lehrer";
      echo "LEHRER";
      exit();
    } else {
      echo "0|Passwort ist falsch;";
      exit();
    }
  } else {
    echo " ";
    exit();
  }
}

?>

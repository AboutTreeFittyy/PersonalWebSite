<?php
/*FileName: config.php
 *Modified: October 28, 2019
 *About: This is the generic php configuration file. Used by other php files to access the database.
*/
$host = "localhost";
$user = "mat_personal";
$password = "strongpassword";
$dbname = "mat_personal_website";

$con = mysqli_connect($host, $user, $password,$dbname);
//Check connection
if (!$con) {
  die("Unable to connect to DB: " . mysqli_connect_error());
}
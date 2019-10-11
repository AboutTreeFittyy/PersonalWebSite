<?php

$host = "localhost"; /* Host name */
$user = "mat_personal"; /* User */
$password = "strongpassword"; /* Password */
$dbname = "mat_personal_website"; /* Database name */

$con = mysqli_connect($host, $user, $password,$dbname);
// Check connection
if (!$con) {
  die("Unable to connect to DB: " . mysqli_connect_error());
}
<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$sql = "INSERT INTO skill (Title, Description) VALUES ('$obj->title','$obj->description')";
if(mysqli_query($con, $sql)){
	$msg = "The DB has been updated successfully.";
}else{
	$msg = "Unable to add to DB.";
} 
//Show error/success message
echo $msg;
?>
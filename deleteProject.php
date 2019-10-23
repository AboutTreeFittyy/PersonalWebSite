<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$msg = $obj;

$sql = "DELETE FROM `showcase` WHERE `showcase_id` = $obj";
if(mysqli_query($con, $sql)){
	$msg = "The project has been deleted successfully.";
}else{
	$msg = "Unable to delete project.";
} 
//Show error/success message
echo $msg;
?>
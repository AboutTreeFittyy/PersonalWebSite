<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$msg = $obj;

$sql = "DELETE FROM `skill` WHERE `skill_id` = $obj";
if(mysqli_query($con, $sql)){
	$msg = "The skill has been deleted successfully.";
}else{
	$msg = "Unable to delete skill.";
} 
//Show error/success message
echo $msg;
?>
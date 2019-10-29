<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$msg = $obj;
//delete skill entries in showcase_skill table
$result = mysqli_query($con, "DELETE FROM showcase_skill WHERE skill_id = $obj");
//check if was able to query db
if(!$result){
	die("Database query failed... Skill deletion aborted.");
}
$sql = "DELETE FROM `skill` WHERE `skill_id` = $obj";
if(mysqli_query($con, $sql)){
	$msg = null;
}else{
	$msg = "Unable to delete skill.";
} 
//Show error/success message
echo $msg;
?>
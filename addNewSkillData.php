<?php
/*FileName: addNewSkillData.php
 *Modified: October 28, 2019
 *About: This php file recieves a post containing new data for a skill. 
 *It retrieves this data then inserts it into the skill table in the database.
*/
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$sql = "INSERT INTO skill (Title, Description) VALUES ('$obj->title','$obj->description')";
if(mysqli_query($con, $sql)){
	$msg = '';
}else{
	$msg = "Unable to add to DB.";
} 
//Show error/success message
echo $msg;
?>
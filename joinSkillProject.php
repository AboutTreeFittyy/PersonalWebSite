<?php
/*FileName: joinSkillProject.php
 *Modified: October 28, 2019
 *About: This php file finds the most recent showcase entry to add the id given for a skill into the join table with.
*/
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$result = mysqli_query($con, "SELECT * FROM showcase WHERE showcase_id=(SELECT max(showcase_id) FROM showcase)");
//check if was able to query db
if(!$result){
	die("Database query failed...");
}
$row = mysqli_fetch_row($result);
//insert the entry into the join table
$sql = "INSERT INTO showcase_skill (showcase_id, skill_id) VALUES (".$row[0].", ".$obj->id.")";
if(mysqli_query($con, $sql)){
	$msg = '';
}else{
	$msg = "Unable to link tables in DB.";
}

//Show error/success message
echo $msg;
?>
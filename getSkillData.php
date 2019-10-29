<?php
/*FileName: getSkillData.php
 *Modified: October 28, 2019
 *About: This php file is used to retrieve the data for all the skills in the database.
*/
// Include the database configuration file
include 'config.php';
$result = mysqli_query($con, "SELECT * FROM skill");
$data = array();
while ($row = mysqli_fetch_object($result)){
    array_push($data, $row);
}
//Show error/success message
echo json_encode($data);
exit();
?>
<?php
/*FileName: getSkillShowCaseData.php
 *Modified: October 28, 2019
 *About: This php file is used to get the data stored in the join table between the skill and showcase tables.
*/
// Include the database configuration file
include 'config.php';
$result = mysqli_query($con, "SELECT * FROM showcase_skill");
$data = array();
while ($row = mysqli_fetch_object($result)){
    array_push($data, $row);
}
//Show error/success message
echo json_encode($data);
exit();
?>
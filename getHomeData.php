<?php
/*FileName: getHomeData.php
 *Modified: October 28, 2019
 *About: This is a php file that is used to retrieve data from the database for the home page.
*/
// Include the database configuration file
include 'config.php';
$result = mysqli_query($con, "SELECT * FROM misc");
$data = array();
while ($row = mysqli_fetch_object($result)){
    array_push($data, $row);
}
//Show error/success message
echo json_encode($data);
exit();
?>
<?php
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
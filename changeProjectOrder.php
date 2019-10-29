<?php
/*FileName: changeProjectOrder.php
 *Modified: October 28, 2019
 *About: This php file receives two id's from a post. Then it uses these id's to switch
 *the two they're fors order in the project table.
*/
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$sql = "UPDATE showcase SET Showcase_Order=$obj->from_order WHERE showcase_id=$obj->from_id";
if(mysqli_query($con, $sql)){
	$msg .= "First Reorder Success. ";
}else{
	$msg .= "First Reorder failure.";
} 
$sql = "UPDATE showcase SET Showcase_Order=$obj->to_order WHERE showcase_id=$obj->to_id";
if(mysqli_query($con, $sql)){
	$msg .= "Second Reorder Success.";
}else{
	$msg .= "Second Reorder Failure.";
} 
//Show error/success message
echo $msg.var_dump($obj);
?>
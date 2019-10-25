<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
//start by getting this entries order for later
$idResult = mysqli_query($con, "SELECT showcase_order FROM `showcase` WHERE showcase_id = $obj");
//check if was able to query db
if(!$idResult){
	die("Database id query failed... Project deletion aborted.");
}
$id = mysqli_fetch_array($idResult);
//delete project entries in showcase_skill table
$result = mysqli_query($con, "DELETE FROM showcase_skill WHERE showcase_id = $obj");
//check if was able to query db
if(!$result){
	die("Database query failed... Project deletion aborted.");
}
//Now that the join table is taken care of, delete the project
$sql = "DELETE FROM `showcase` WHERE `showcase_id` = $obj";
if(mysqli_query($con, $sql)){
	$msg = "The project has been deleted successfully.";
}else{
	die("Unable to delete project. SQL issues resulted and now must be taken care of.");
}
//Now update the orders of the showcase table
//Get entries with higher order than deletion with order gotten before deletion
$orderResult = mysqli_query($con, "SELECT * FROM `showcase` WHERE showcase_order > ".$id[0]);
//check if was able to query db
if(!$orderResult){
	die("Database * query failed... Order not adjusted properly. Ignore if this was last entry to delete.");
	//die(var_dump($id[0]));
}
$data = array();
while ($row = mysqli_fetch_object($orderResult)){
    array_push($data, $row);
}
//now decrease the value for those entries in the table
for($i = 0; $i < sizeof($data); $i++){
	$newOrder = $data[$i]->Showcase_Order - 1;
	$order = $data[$i]->showcase_id;
	$sql = "UPDATE showcase SET Showcase_Order = $newOrder WHERE showcase_id = $order";
	if(mysqli_query($con, $sql)){
		$msg .= " Reorder Success. ";
	}else{
		$msg .= " Reorder failure.";
	}
}
//Show error/success message
echo $msg;
?>
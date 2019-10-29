<?php
/*FileName: addShowCaseData.php
 *Modified: October 28, 2019
 *About: This php file adds the data it receives into the showcase table in the database.
*/
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$type = pathinfo($obj->fileName, PATHINFO_EXTENSION);
//get num of entries so i can set order
$result = mysqli_query($con, "SELECT COUNT(*) FROM showcase");
$row = mysqli_fetch_row($result);
// Allow certain file formats
$allowedTypes = array('jpg','png','jpeg');
if(in_array($type, $allowedTypes)){
	$sql = "INSERT INTO showcase (Title, Description, Image_Full, Showcase_Order)
	VALUES ('$obj->title','$obj->description','$obj->fileName', ".$row[0].")";
	if(mysqli_query($con, $sql)){
		$msg = '';
	}else{
		$msg = "Unable to upload project data to DB.";
	} 
} else{
	//invalid file type
	$msg = "Invalid file type selected, only jpg, png or jpeg allowed.";
}
//Show error/success message
echo $msg;
?>
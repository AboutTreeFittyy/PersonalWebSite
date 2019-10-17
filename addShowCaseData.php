<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$type = pathinfo($obj->fileName, PATHINFO_EXTENSION);
// Allow certain file formats
$allowedTypes = array('jpg','png','jpeg');
if(in_array($type, $allowedTypes)){
	$sql = "INSERT INTO showcase (Title, Description, Image_Full, Showcase_Order)
	VALUES ('$obj->title','$obj->description','$obj->fileName', 4)";
		if(mysqli_query($con, $sql)){
			$msg = "The file has been uploaded successfully.";
		}else{
			$msg = "Unable to upload file path to DB.";
		} 
} else{
	//invalid file type
	$msg = "Invalid file type selected, only jpg, png or jpeg allowed.";
}
//Show error/success message
echo $msg;
?>
<?php
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$type = pathinfo($obj->fileName, PATHINFO_EXTENSION);
// Allow certain file formats
$allowedTypes = array('jpg','png','jpeg');
if(in_array($type, $allowedTypes)){
	$sql = "TRUNCATE TABLE misc";
	if(mysqli_query($con, $sql)){
		$msg .= "Previous data deleted.";
		$sql = "INSERT INTO misc (Name, About, Image) VALUES ('$obj->title','$obj->description','$obj->fileName')";
		if(mysqli_query($con, $sql)){
			$msg .= "The file has been uploaded successfully.";
		}else{
			$msg .= "Unable to upload file path to DB.";
		} 
	}else{
		$msg .= "Unable to delete old data.";
	}	
} else{
	//invalid file type
	$msg .= "Invalid file type selected, only jpg, png or jpeg allowed.";
}
//Show error/success message
echo $msg;
?>
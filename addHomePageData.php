<?php
/*FileName: addHomePageData.php
 *Modified: October 28, 2019
 *About: This php file receives an incoming post with data for a new home page entry. It takes
 * this data and inserts it into the misc table in the database after emptying the table first
 * so that there is only the one entry.
*/
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]);
$type = pathinfo($obj->fileName, PATHINFO_EXTENSION);
// Allow certain file formats
$allowedTypes = array('jpg','png','jpeg');
if(in_array($type, $allowedTypes)){
	//truncate table to get rid of old entry
	$sql = "TRUNCATE TABLE misc";
	if(mysqli_query($con, $sql)){
		//now that the other entry is gone, insert the new one
		$sql = "INSERT INTO misc (Name, About, Image) VALUES ('$obj->title','$obj->description','$obj->fileName')";
		if(mysqli_query($con, $sql)){
			$msg = '';
		}else{
			$msg .= "Unable to update home page data.";
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
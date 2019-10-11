<?php
// Include the database configuration file
include 'config.php';
$statusMsg = '';

// File upload path
//$targetDir = "images/";
//$fileName = basename($_FILES["file"]["name"]);
$obj = json_decode($_POST["myData"]);
//$targetFilePath = $targetDir . $fileName;
//$fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);
$sql = "INSERT INTO showcase 
(Title, Description, Image_Full, Showcase_Order) VALUES ('$obj->title','$obj->description','$obj->fileName', 4)";
            if(mysqli_query($con, $sql)){
                $statusMsg = "The file has been uploaded successfully.";
            }else{
                $statusMsg = "Unable to upload file path to DB.";
            } 
/*
if(isset($_POST["submit"]) && !empty($_FILES["file"]["name"])){
    // Allow certain file formats
    $allowTypes = array('jpg','png','jpeg');
    if(in_array($fileType, $allowTypes)){
        // Upload file to server
        if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){
            // Insert image file name into database
			$sql = "INSERT INTO showcase (Title, Description, Image_Full, Image_Thumbnail, 
			Image_Mobile, Showcase_Order) VALUES ('$title','$description','imagefull','thumb','mobile', 4)";
            if(mysqli_query($con, $sql)){
                $statusMsg = "The file ".$fileName. " has been uploaded successfully.";
            }else{
                $statusMsg = "Unable to upload file path to DB.";
            } 
        }else{
            $statusMsg = "Couldn't upload image.";
        }
    }else{
        $statusMsg = 'Invalid file type. Only JPG, JPEG and PNG files are permitted.';
    }
}else{
    $statusMsg = 'No file selected.';
}
*/
// Display status message
echo $statusMsg;
?>
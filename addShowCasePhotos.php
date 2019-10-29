<?php
/*FileName: addShowCasePhotos.php
 *Modified: October 28, 2019
 *About: This php file receives 3 image blobs which it then stores in the /images folder
*/
$msg = '';
$loc = '';
if( isset($_FILES['main']) and !$_FILES['main']['error'] ){
	$loc = "images/".$_FILES['main']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['main']['tmp_name']) );
    $msg = '';
} else{
	die("Main Photo Failed To Save ");
}
if( isset($_FILES['mobile']) and !$_FILES['thumb']['error']){
	$loc = "images/".$_FILES['mobile']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['mobile']['tmp_name']) );
    $msg = '';
} else{
	die("Mobile Photo Failed To Save ");
}
if( isset($_FILES['thumb']) and !$_FILES['thumb']['error'] ){
	$loc = "images/".$_FILES['thumb']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['thumb']['tmp_name']) );
    $msg = '';
} else{
	die("ThumbNail Photo Failed To Save ");
}
//Show error/success message
echo $msg;
?>
<?php
/*FileName: addHomePagePhoto.php
 *Modified: October 28, 2019
 *About: This php file receives a post containing an image blob which it saves in the /images folder
*/
$msg = '';
$loc = '';
if( isset($_FILES['main']) and !$_FILES['main']['error'] ){
	$loc = "images/".$_FILES['main']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['main']['tmp_name']) );
    $msg = '';
} else{
	$msg .= "Home Page Photo Failed To Save ";
}
//Show error/success message
echo $msg;
?>
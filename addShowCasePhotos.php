<?php
$msg = '';
$loc = '';
if( isset($_FILES['main']) and !$_FILES['main']['error'] ){
	$loc = "images/".$_FILES['main']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['main']['tmp_name']) );
    $msg .= "Main Photo Saved ";
} else{
	$msg .= "Main Photo Failed To Save ";
}
if( isset($_FILES['mobile']) and !$_FILES['thumb']['error']){
	$loc = "images/".$_FILES['mobile']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['mobile']['tmp_name']) );
    $msg .= "Mobile Photo Saved ";
} else{
	$msg .= "Mobile Photo Failed To Save ";
}
if( isset($_FILES['thumb']) and !$_FILES['thumb']['error'] ){
	$loc = "images/".$_FILES['thumb']['name'];
	file_put_contents( $loc, file_get_contents($_FILES['thumb']['tmp_name']) );
    $msg .= "ThumbNail Photo Saved ";
} else{
	$msg .= "ThumbNail Photo Failed To Save ";
}
//Show error/success message
echo $msg;
?>
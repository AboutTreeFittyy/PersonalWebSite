//Switch the main gallery image to the one passed in the parameter
function switchImage(param){
	//Check which image it should be set to, then set it
	if(param==1){
		document.getElementById("current-image").src = "images/dragon.jpg";
	} else{
		document.getElementById("current-image").src = "images/myself.jpg";			
	}
	//Call resizeThumbNails to make sure gallery is adjusted after switching image
	resizeThumbNails();
}
//Resizes the thumbnails for the gallery to match the height of the main image
function resizeThumbNails(){
	//get the height of the image currently
	var tnHeight = document.getElementById("image-container").clientHeight;
	//adjust the thumbnail related divs to have their height be the same as the images
	document.getElementById("mts").style.height = tnHeight+"px";
	document.getElementById("my-thumbnail").style.height = tnHeight+"px";
}
//set the resizeThumbNails function to be called when the page loads or is resized
window.onload = resizeThumbNails;
window.onresize = resizeThumbNails;
/* FileName: ShowCaseManager.js
 * Author: Mathew Boland
 * Date Modified: October 10th, 2019
 * Description: Some functions that are used to manage the ShowCase. Resizing, changing 
 * images and adjusting gallery size is done here to make the page more dynamic.
*/

/* This function takes in a parameter of a String that indicates the location of the image
 * that is to be switched to and displayed in the gallery. 
*/
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
/* This function reads the image-container div to check its height so that the 
 * ShowCase can resize dynamically based on the main images current height.
*/
function resizeThumbNails(){
	//get the height of the image currently
	var tnHeight = document.getElementById("image-container").clientHeight;
	//adjust the thumbnail related divs to have their height be the same as the images
	document.getElementById("mts").style.height = tnHeight+"px";
	document.getElementById("my-thumbnail").style.height = tnHeight+"px";
}
/* This bit of code makes it so that these functions are called when they are needed.
 * Making the gallery change when the window resizes or initially loads to fit better.
*/
window.onload = resizeThumbNails;
window.onresize = resizeThumbNails;
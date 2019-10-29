/* FileName: ShowCaseManager.js
 * Author: Mathew Boland
 * Date Modified: October 28th, 2019
 * Description: Some functions that are used to manage the ShowCase. Resizing, changing 
 * images and adjusting gallery size is done here to make the page more dynamic.
*/

/* This function takes in a parameter of a String that indicates the location of the image
 * that is to be switched to and displayed in the gallery. 
*/
function switchImage(param){
	//Get which image it should be set to from param, then set it
	var path = "images/"+param;
	//check for mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		var path = "images/M_"+param;
	}
	var image = new Image();				
	image.src = path;	
	document.getElementById("current-image").src = image.src;
	//make sure the image is loaded before resizing
	image.onload = () =>{
		//Change description of main image
		document.getElementById("my-caption").innerHTML = document.getElementById(param+"_title").innerHTML;
		document.getElementById("my-info").innerHTML = document.getElementById(param+"_desc").innerHTML;
		//Call resizeThumbNails to make sure gallery is adjusted after switching image
		resizeThumbNails();
	};
}
/* This function reads the image-container div to check its height so that the 
 * ShowCase can resize dynamically based on the main images current height.
*/
function resizeThumbNails(){
	//get the height of the image currently
	var tnHeight = document.getElementById("current-image").height;
	//adjust the thumbnail related divs to have their height be the same as the images
	document.getElementById("mts").style.height = tnHeight+"px";
	document.getElementById("my-thumbnail").style.height = tnHeight+"px";
}
/* This bit of code makes it so that these functions are called when they are needed.
 * Making the gallery change when the window resizes or initially loads to fit better.
*/
var toPrint = '';
function printPage(){		
	setShowCaseData();
	fixHeader();
}

function fixHeader(){
	$head = $("#my-header");
	$pad = $head.css('padding-top');
	$pad = $pad.slice(0, -2);
	var bottom = $head.height()+(Number($pad)*2);
	$("#pageData").css({ top: bottom+'px', position: 'relative' });
	resizeThumbNails();
}
window.onresize = fixHeader;
//set printPageContents to run when page loads
window.onload = printPage;
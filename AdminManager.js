/* FileName: AdminManager.js
 * Author: Mathew Boland
 * Date Modified: October 10th, 2019
 * Description: Multiple functions used to manage the administrative page
 * for the site. This so far only has functions used to adjust images
 * that are saved to be more compatible with the website. more functions may
 * be added if needed.
*/

/* This creates a copy of the main image that can be used on mobile versions
 * of the website. It's important features are reducing the quality of the 
 * and the height of the image to be more portable.
*/
function createMobileImageCopy(dataURL){
	var image = new Image();
	image.src = dataURL;
	//Create a canvas to use for adjusting the image with 
	var canvas = document.createElement("canvas");
	canvas.width = image.width*0.3;
	canvas.height = image.height*0.3;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//Return the image made on the canvas
	return canvas.toDataURL("image/jpeg", 0.5);
}
/* This creates a copy of the main image with a 1:5 ratio to be used for the 
 * desktop version of the sites thumbnails. Image quality and size are reduced
 * to improve performance. A mobile version of this function may be made later
 * to test if it can further improve mobile performance.
*/
function createThumbNailCopy(dataURL){
	var image = new Image();
	image.src = dataURL;
	//Create a canvas to use for adjusting the image with 
	var canvas = document.createElement("canvas");
	canvas.width = image.width*0.2;
	canvas.height = image.height*0.2;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//Return the image made on the canvas
	return canvas.toDataURL("image/jpeg", 0.5);
}
/* This function takes the image from the form and adjusts its height to be
 * at the same scale it was before adjusted to a 1200 pixel width.
 * Once the dimensions are adjusted, a copy of the data url is returned.
 * Null is returned on failure.
*/
function normalizeImage(image){
	var scale = image.height/image.width;
	alert("Before Height:"+image.height+", Image Width: "+image.width+"");
	if(image.height > image.width || image.width < 1600 || image.height < 900){
		alert("After Height:"+image.height+", Image Width: "+image.width+" THIS BLOWS");
		return null; // this image would look terrible in the gallery
	}
	//Create a canvas to use for adjusting the image with 
	var canvas = document.createElement("canvas");
	canvas.width = 1200;
	canvas.height = scale*1200;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//Return the image made on the canvas
	return canvas.toDataURL("image/jpeg", 0.9);//};
}
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
 * and the hieght of the image to be more portable.
*/
function createMobileImageCopy(){
	
}
/* This creates a copy of the main image with a 1:5 ratio to be used for the 
 * desktop version of the sites thumbnails. Image quality and size are reduced
 * to improve performance. A mobile version of this function may be made later
 * to test if it can further improve mobile performance.
*/
function createThumbNailCopy(){
	
}
/* This is the function that checks the image to make sure it meets the 
 * criteria for an image that will work with the sites framework in 
 * terms of dimensions and quality. Returns true if image is okay.
*/
function correctImageSize(){
	
}
/* This function takes the image from the form and adjusts its height to be
 * a maximum of 500px. It is important to use correctImageSize() first
 * otherwise this function may not work correctly and save a bad image.
 * Once the dimensions are adjusted, a copy is saved to the database.
*/
function normalizeImageHeight(){
	
}
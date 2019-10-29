/* FileName: AdminManager.js
 * Author: Mathew Boland
 * Date Modified: October 28th, 2019
 * Description: Multiple functions used to manage the administrative page
 * for the site. Handles resizing of images for upload, conversion to blob,
 * changing project orders and other small things for the admin page.
*/

/* This creates a copy of the main image that can be used on mobile versions
 * of the website. It's important features are reducing the quality of the 
 * and the height of the image to be more portable.
*/
function createMobileImageCopy(image){
	//Create a canvas to use for adjusting the image with 
	var canvas = document.createElement("canvas");
	canvas.width = image.width*0.5;
	canvas.height = image.height*0.5;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//Return the image made on the canvas
	return canvas.toDataURL("image/jpeg", 0.4);
}
/* This creates a copy of the main image with a 1:5 ratio to be used for the 
 * desktop version of the sites thumbnails. Image quality and size are reduced
 * to improve performance. A mobile version of this function may be made later
 * to test if it can further improve mobile performance.
*/
function createThumbNailCopy(image){
	//Create a canvas to use for adjusting the image with 
	var canvas = document.createElement("canvas");
	var scale = 300/image.width;
	canvas.width = 300;
	canvas.height = image.height*scale;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//Return the image made on the canvas
	return canvas.toDataURL("image/jpeg", 0.3);
}
/* This function takes the image from the form and adjusts its height to be
 * at the same scale it was before adjusted to a 1200 pixel width.
 * Once the dimensions are adjusted, a copy of the data url is returned.
 * Null is returned on failure.
*/
function normalizeImage(image){
	var scale = 700/image.height;
	//alert("Before Height:"+image.height+", Image Width: "+image.width+"");
	if(image.height > image.width || image.width < 700 || image.height < 400){
		return null; // this image would look terrible in the gallery
	}
	//Create a canvas to use for adjusting the image with 
	var canvas = document.createElement("canvas");
	canvas.width = image.width * scale;
	canvas.height = 700;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
	//Return the image made on the canvas
	return canvas.toDataURL("image/jpeg", 0.6);//};
}
/*This function switches the data for the order of the projects. Much of this may be unneeded now
* as it refreshes on success anyways.
*/
function changeOrder(id, order){
	//Get project info of two that are changing orders
	var thisTitle = document.getElementById("dds"+id);
	var otherTitle = document.querySelector("button[value='"+order+"']");	
	//save the current order of the title clicked
	var curOrder = thisTitle.value;
	//swap the values of the projects
	thisTitle.value = otherTitle.value;
	otherTitle.value = curOrder;
	//switch text displayed on buttons
	thisTitle.innerText = "["+(1+Number(order))+"] "+thisTitle.innerText.substring(4);
	otherTitle.innerText = "["+(1+Number(curOrder))+"] "+otherTitle.innerText.substring(4);
	//Okay so actually should just ajax request this when clicked
	var data = {
	"from_id" : Number(id),
	"from_order" : order,
	"to_id" : Number(otherTitle.id.substring(3)),
	"to_order" : Number(curOrder)
	};							
	var dataString = JSON.stringify(data);
	$.ajax({
		url:"changeProjectOrder.php",
		method: "POST",
		data: {myData: dataString},
		success:function(data){
			//reload the div so that it updates properly
			setAdminProjectData();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Problem: "+XMLHttpRequest.status+" "+XMLHttpRequest.statusText);
		}
	});	
}
function fixHeader(){
	$head = $("#my-header");
	$pad = $head.css('padding-top');
	$pad = $pad.slice(0, -2);
	var bottom = $head.height()+(Number($pad)*2);
	$("#my-form").css({ top: bottom+'px', position: 'relative' });
}
window.onresize = fixHeader;

function printPage(){
	var toPrint = '';
	//Add sections with skills that need to be selected
	setAdminSkillsData();
	//Now add project data 
	setAdminProjectData();
	fixHeader();
}
//set printPageContents to run when page loads
window.onload = printPage;
/* Function Name: dataURItoBlob
 * Source: https://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript
 * Date Written: May 23, 2017
 * Author: Matthew
 */
function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);
  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  // create a view into the buffer
  var ia = new Uint8Array(ab);
  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
	  ia[i] = byteString.charCodeAt(i);
  }
  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}
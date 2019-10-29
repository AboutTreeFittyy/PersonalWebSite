/* FileName: HTMLGenerator.js
 * Author: Mathew Boland
 * Date Modified: October 22th, 2019
 * Description: Class with accessors to the sites database.
 * Using set functions to retrieve the data from the database
 * needed for that particular part of the site. Then getters
 * are used to retrieve formatted versions of the data for the 
 * site. Data is stored globally and accessed this way to limit
 * the sites need to access the database.
*/

/* Global variables
 * Hold the unformatted data from the database so that it can be formatted
 * for each use and the database only needs to be accessed once.
*/
var showCaseData = '';
var homeData = '';
var adminSkillsData = '';
var adminProjectData = '';
var footer = '<footer id="my-footer"><p>Author: Mathew Boland - Last Updated:October 28, 2019</p></footer>';

/* Uses the global showCaseData variable to format and return usable
 * HTML to the caller for display.
*/
function getShowCaseData(){
	return showCaseData;
}
/* Accesses the database when called to retrieve the needed data for
 * the ShowCase then saves it formatted to the showCaseData variable.
*/
function setShowCaseData(){
	//get data with ajax
	var pjData = new XMLHttpRequest();
	var tnBuffer = '', projectBuffer = '';
	pjData.open("GET", "getProjectData.php", true);
	pjData.send();
	pjData.onreadystatechange = function() {
		//Retrieve data for projects on success
		if (pjData.readyState == 4 && pjData.status == 200) {
			projectData = JSON.parse(pjData.responseText);
			var skData = new XMLHttpRequest();
			skData.open("GET", "getSkillData.php", true);
			skData.send();
			skData.onreadystatechange = function() {
				//Retrieve the data for the skills on success
				if (skData.readyState == 4 && skData.status == 200) {
					skillData = JSON.parse(skData.responseText);
					var spData = new XMLHttpRequest();
					spData.open("GET", "getSkillShowCaseData.php", true);
					spData.send();
					spData.onreadystatechange = function() {
						//Retrieve the data for the showcase_skill join table on success
						if (spData.readyState == 4 && spData.status == 200) {
							joinData = JSON.parse(spData.responseText);
							var first = 0;
							//Now we have all the data we need so start generating the HTML from it
							for(var i = 0; i < projectData.length; i++){
								//Cycle through the projects to display them by order
								for(var j = 0; j < projectData.length; j++){
									//Found current order to display
									if(projectData[j].Showcase_Order == i){
										//Save the first order for later
										if(projectData[j].Showcase_Order == 0){
											first = j;
										}
										//Add all the thumbnails and their onclick functions to the gallery
										var quoName = "'"+projectData[j].Image_Full+"'";
										tnBuffer += '<img src="images/TN_'+projectData[j].Image_Full+'" class="my-screen" id="img1" onClick="switchImage('+quoName+')">';
										//Add all the projects to display below the gallery
										//First insert the image depending on if viewed mobile or in desktop
										if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
											projectBuffer += '<div class="my-showcase"><div class="my-showcase-left"><img id="my-screen" src="images/M_'+projectData[j].Image_Full+'" class="my-screen"></div>';
										} else{
											projectBuffer += '<div class="my-showcase"><div class="my-showcase-left"><img id="my-screen" src="images/'+projectData[j].Image_Full+'" class="my-screen"></div>';
										}		
										//Now insert the details
										projectBuffer += '<div class="my-showcase-right"><div id="'+projectData[j].Image_Full+'_title">'+projectData[j].Title+'</div><a href="#my-details">Back to top</a></br><a href="https://github.com/AboutTreeFittyy">Project on GitHub</a></br>';				
										//Now for matching the join table
										for(var k = 0; k < joinData.length; k++){
											//While scanning join table stop when a match for current project id is found
											if(joinData[k].showcase_id == projectData[j].showcase_id){
												//Then search through the skills table
												for(var h = 0; h < skillData.length; h++){
													//Until we find a skill entry that matches the entry for the projects id in the join table
													if(skillData[h].skill_id == joinData[k].skill_id){
														//Matching entry found so add its title to buffer
														projectBuffer += ' - '+'<a href="Home.html#'+skillData[h].Title+'">'+skillData[h].Title+'</a>';
													}
												}												
											}
										}		
										//finally insert the description
										projectBuffer += ' -</div><div class="my-showcase-bottom"><div class="my-details" id="'+projectData[j].Image_Full+'_desc">'+projectData[j].Description+'</div></div></div>';		
									}
								}		
							}	
							showCaseData = '<div class="my-details" id="my-details">Feel free to browse and check out some of the projects Ive made</div><div class="my-top-showcase" id="mts"><div class="image-container"';
							var imagePath = '';
							//check again for mobile
							if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
								imagePath = 'images/M_'+projectData[first].Image_Full;
							} else{
								imagePath = 'images/'+projectData[first].Image_Full;
							}
							//load in image
							var mImage = new Image();
							mImage.src = imagePath;
							mImage.onload = function(){
								//Wait for image to load before resizing or else it will be resized to 0
								resizeThumbNails();
							}
							//Add in final bits of data before adding it to the divs html
							showCaseData += 'id="image-container"><img id="current-image" src="'+mImage.src+'" class="my-screen"><div class="caption-container"><div id="my-caption" class="my-caption">';
							showCaseData += projectData[first].Title+'</div><div id="my-info" class="my-info">'+projectData[first].Description+'</div></div></div><div id="my-thumbnail" class ="my-thumbnail">';
							showCaseData += tnBuffer+'</div></div><div class="my-details">Scroll down to learn more</div>';
							showCaseData += projectBuffer +footer;
							$('#pageData').html(showCaseData);
						}
					};
				}
			};
		}
	};		
}
/* Uses the global homeData variable to format and return usable
 * HTML to the caller for display.
*/
function getHomeData(){
	return homeData;
}
/* Accesses the database when called to retrieve the needed data for
 * the Home page then saves it formatted to the homeData variable.
*/
function setHomeData(){
	//get data with ajax
	var pjData = new XMLHttpRequest();
	var skillsListBuffer = '', skillsSectionBuffer = '';
	pjData.open("GET", "getProjectData.php", true);
	pjData.send();
	pjData.onreadystatechange = function() {
		//Retrieve data for projects on success
		if (pjData.readyState == 4 && pjData.status == 200) {
			projectData = JSON.parse(pjData.responseText);
			var skData = new XMLHttpRequest();
			skData.open("GET", "getSkillData.php", true);
			skData.send();
			skData.onreadystatechange = function() {
				//Retrieve the data for the skills on success
				if (skData.readyState == 4 && skData.status == 200) {
					skillData = JSON.parse(skData.responseText);
					var spData = new XMLHttpRequest();
					spData.open("GET", "getSkillShowCaseData.php", true);
					spData.send();
					spData.onreadystatechange = function() {
						//Retrieve the data for the showcase_skill join table on success
						if (spData.readyState == 4 && spData.status == 200) {
							joinData = JSON.parse(spData.responseText);
							var hData = new XMLHttpRequest();
							hData.open("GET", "getHomeData.php", true);
							hData.send();
							hData.onreadystatechange = function() {
								//Retrieve the data for the showcase_skill join table on success
								if (hData.readyState == 4 && hData.status == 200) {
									miscData = JSON.parse(hData.responseText);
									//loop through sections to add for every skill
									for(var i = 0; i < skillData.length; i++){
										//Add each element of the skills list
										skillsListBuffer += '<li><a href="#'+skillData[i].Title+'">'+skillData[i].Title+'</a></li>';
										//More complex now, add each skill and its details to my skills section div
										skillsSectionBuffer += '<div class="my-skill" id="'+skillData[i].Title+'"><h2>'+skillData[i].Title+'</h2>';
										skillsSectionBuffer += skillData[i].Description+'</br>';
										for(var j = 0; j < joinData.length; j++){
											//found current skill in join table
											if(joinData[j].skill_id == skillData[i].skill_id){
												//Now find what project it belongs to
												for(var k = 0; k < projectData.length; k++){
													//try to match the project id with the one found in the join table
													if(joinData[j].showcase_id == projectData[k].showcase_id){
														//Found project with this skill so add it
														skillsSectionBuffer += '<a href="#my-header">'+projectData[k].Title+'</a>';
													}											
												}
											}									
										}
										skillsSectionBuffer += '</br></div>';
									}
									//add image name and my name
									homeData += '<div class="my-home"><div class="my-home-left"><img id="my-screen" src="images/'+miscData[0].Image+'" class="my-screen"></div><div class="my-home-right"></br><h2>'+miscData[0].Name+'</h2></br>';
									//add description and then skill list
									homeData += miscData[0].About+'</br></br>More on what I do:<ul id="skill-list">'+skillsListBuffer+'</ul>';
									//add skills section now
									homeData += '</div></div><div class = "my-skills" id="skills">'+skillsSectionBuffer+'</div><div id="spacefooter"></div>';
									homeData += footer;
									document.getElementById('pageData').innerHTML = homeData;
								}
							};
						}
					};
				}
			};
		}
	};		
}
/* Uses the global adminSkillsData variable to format and return usable
 * HTML to the caller for display.
*/
function getAdminSkillsData(){
	return adminSkillsData;
}
/* Accesses the database when called to retrieve the needed data for the skill delete
 * admin area, then saves it formatted to the adminSkillsData variable.
*/
function setAdminSkillsData(){
	var ajax = new XMLHttpRequest();
	var buf = '';
	ajax.open("GET", "getSkillData.php", true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			adminSkillsData = JSON.parse(this.responseText);
			for(var i = 0; i < adminSkillsData.length; i++){
				buf += '<div id="psd'+adminSkillsData[i].skill_id+'"><input type="checkbox" id="setProjectSkill'+adminSkillsData[i].skill_id+'" name="skill" data-parsley-checkmin="1" required>'+adminSkillsData[i].Title+'</div>';
			}
			document.getElementById('addSkills').innerHTML = buf;
			//Now do the skill delete section
			buf = '';
			for(var i = 0; i < adminSkillsData.length; i++){
				buf += '<div id="dsd'+adminSkillsData[i].skill_id+'"><input type="checkbox" id="deleteSkill'+adminSkillsData[i].skill_id+'" name="skilldelete" data-parsley-checkmin="1" required>'+adminSkillsData[i].Title+'</div>';
			}
			document.getElementById('deleteSkills').innerHTML = buf+'<div id="deleteSkillStatus"></div><input class="button" type="submit" name="deleteSkill" value="Delete Selected Skill(s)"><br><br>'+footer;
		}
	};
}
/* Uses the global adminProjectData variable to format and return usable
 * HTML to the caller for display.
*/
function getAdminProjectData(){
	return adminProjectData;
}
/* Accesses the database when called to retrieve the needed data for the project delete
 * admin area, then saves it formatted to the adminProjectData variable.
*/
function setAdminProjectData(){
	//get data with ajax
	var ajax = new XMLHttpRequest();
	var buf = '';
	ajax.open("GET", "getProjectData.php", true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			adminProjectData = JSON.parse(this.responseText);
			for(var i = 0; i < adminProjectData.length; i++){
				buf += '<div id="dps'+adminProjectData[i].showcase_id+'"><input type="checkbox" id="deleteProjectSkill'+adminProjectData[i].showcase_id+'" name="skill" value="prep" data-parsley-checkmin="1" required>'+adminProjectData[i].Title+'</div>';
			}
			document.getElementById('deleteProjects').innerHTML = buf;
			buf = '';
			//Check if valid amount of skills to order
			if(adminProjectData.length < 2){
				buf = "Not Enough Projects To Reorder"
			}else{
				var funcBuf = '';
				for(var i = 0; i < adminProjectData.length; i++){
					//cycle through projects to display them in order
					for(var k = 0; k < adminProjectData.length; k++){
						if(adminProjectData[k].Showcase_Order == i){
							buf += '<div class="dropdown"><button class="drop" id="dds'+adminProjectData[k].showcase_id+'" value="'+i+'">['+(i+1)+'] '+adminProjectData[k].Title+'</button><div class="dropdown-skills">';
							for(var j = 0; j < adminProjectData.length; j++){
								//Why allow them to reorder to the same stuff
								if(i!=j){
									funcBuf = "changeOrder('"+adminProjectData[k].showcase_id+"',"+j+")";
									buf += '<a onClick="'+funcBuf+'">'+(j+1)+'</a>';
								}					
							}
							buf += '</div></div>';
						}
					}
				}
			}
			document.getElementById('orderProjects').innerHTML = buf;
		}
	};
}
















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
var footer = '<footer id="my-footer"><p>Author: Mathew Boland - Last Updated:October 25, 2019</p></footer>';

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
	showCaseData = '';
	var tnBuffer = '';
	var projectBuffer = '';
	var pjImageName = ['dragon.jpg', 'myself.jpg'];
	var caption = ['This is the dinosaur caption', 'Thisi s my own caption'];
	var captionInfo = ['Dragon info', 'My info'];
	var skills = ['SuperMan', 'SuperFreak', 'PowerJunkie'];
	var descriptions = ['This is a description of my project. There are many others like it but this one is mine.', 'This is a description of my project. There are many others like it but this one is mine.'];
	//fill data for each project accordingly
	for(var i = 0; i < pjImageName.length; i++){
		//Add all the thumbnails and their onclick functions to the gallery
		var quoName = "'"+pjImageName[i]+"'";
		tnBuffer += '<img src="images/TN_'+pjImageName[i]+'" class="my-screen" id="img1" onClick="switchImage('+quoName+')">';
		//Add all the projects to display below the gallery
		//First insert the image depending on if viewed mobile or in desktop
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			projectBuffer += '<div class="my-showcase"><div class="my-showcase-left"><img id="my-screen" src="images/M_'+pjImageName[i]+'" class="my-screen"></div>';
		} else{
			projectBuffer += '<div class="my-showcase"><div class="my-showcase-left"><img id="my-screen" src="images/'+pjImageName[i]+'" class="my-screen"></div>';
		}		
		//Now insert the details
		projectBuffer += '<div class="my-showcase-right">Title</br><a href="#my-header">Back to top</a></br><a href="https://github.com/AboutTreeFittyy">Project on GitHub</a></br>';				
		for(var j = 0; j < skills.length; j++){
			projectBuffer += skills[j]+'  ';
		}		
		//finally insert the description
		projectBuffer += '</div><div class="my-showcase-bottom"><div class="my-details">'+descriptions[i]+'</div></div></div>';			
	}	
	showCaseData = '<div class="my-details">Feel free to browse and check out some of the projects Ive made</div><div class="my-top-showcase" id="mts"><div class="image-container"';
	//check again for mobile
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		showCaseData += 'id="image-container"><img id="current-image" src="images/M_'+pjImageName[0]+'" class="my-screen"><div class="caption-container"><div id="my-caption" class="my-caption">';
	} else{
		showCaseData += 'id="image-container"><img id="current-image" src="images/'+pjImageName[0]+'" class="my-screen"><div class="caption-container"><div id="my-caption" class="my-caption">';
	}	
	showCaseData += caption[0]+'</div><div id="my-info" class="my-info">'+captionInfo[0]+'</div></div></div><div id="my-thumbnail" class ="my-thumbnail">';
	showCaseData += tnBuffer+'</div></div><div class="my-details">Scroll down to learn more</div>';
	showCaseData += projectBuffer +footer;
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
	homedata = '';
	var skillsListBuffer = '';
	var skillsSectionBuffer = '';
	var imageName = 'myself.jpg';
	var myName = 'Mathew Boland';
	var desc = 'Some guy who writes computer programs. Yada yada Ill think of a better description of myself later.For now this will do though to test the look of my site I guess.';
	var titles = ["Programming in C", "Programming in Java", "Android Studio", "Web Building"];
	var descriptions = ["I wrote a lot in C my dude. Like a lot. Well for a student it was a lot. I wrote a compiler and got myself a stuffed dinosaur, you jelly?", "To be honest this is my strong language. I've been using it for around 5 years now. Learned to code with it and while I know it's got some issues. It's still a fun language to write programs with. Check out my calculator on GitHub I made in Java or the android projects, they're in Java too.", "I've built a few games in android studio. Platformer, flappy bird, and asteroid style stuff. Check out my GitHubI've got more on it there.", "Well I mean come on. I've clearly done something. What do you think your reading this on? or maybe you just really hate it that much... alright fine don't hire me then, see if I care!"];
	var array1 = ["Compiler Project"];
	var array2 = ["Calculator Project"];
	var array3 = ["Android Platformer", "Android Asteroids"];
	var array4 = ["This website"];
	var arrayArray = [array1, array2, array3, array4];
	//loop through sections to add for length of array
	for(var i = 0; i < titles.length; i++){
		//Add each element of the skills list
		skillsListBuffer += '<li><a href="#'+titles[i]+'">'+titles[i]+'</a></li>';
		//More complex now, add each skill and its details to my skills section div
		skillsSectionBuffer += '<div class="my-skill" id="'+titles[i]+'"><h2>'+titles[i]+'</h2>';
		skillsSectionBuffer += descriptions[i]+'</br>';
		for(var j = 0; j < arrayArray[i].length; j++){
			skillsSectionBuffer += '<a href="#my-header">'+arrayArray[i][j]+'</a>';
		}
		skillsSectionBuffer += '</br></div>';
	}
	//add image name and my name
	homeData += '<div class="my-home"><div class="my-home-left"><img id="my-screen" src="images/'+imageName+'" class="my-screen"></div><div class="my-home-right"></br><h2>'+myName+'</h2></br>';
	//add description and then skill list
	homeData += desc+'</br></br>More on what I do:<ul id="skill-list">'+skillsListBuffer+'</ul>';
	//add skills section now
	homeData += '</div></div><div class = "my-skills" id="skills">'+skillsSectionBuffer+'</div><div id="spacefooter"></div>';
	homeData += footer;
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
			document.getElementById('deleteSkills').innerHTML = buf+'<input class="button" type="submit" name="deleteSkill" value="Delete Selected Skill(s)"><br><br>'+footer;
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
















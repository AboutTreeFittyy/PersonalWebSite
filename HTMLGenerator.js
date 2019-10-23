/* FileName: HTMLGenerator.js
 * Author: Mathew Boland
 * Date Modified: October 16th, 2019
 * Description: Class with accessors to the sites database.
 * Using set functions to retrieve the data from the database
 * needed for that particular part of the site. Then getters
 * are used to retrieve formatted versions of the data for the 
 * site. Data is stored globally and accessed this way to limit
 * the sites need to access the database.
 * NOTE: Currently setters are passed data until the database is set up.
*/

/* Global variables
 * Hold the unformatted data from the database so that it can be formatted
 * for each use and the database only needs to be accessed once.
*/
var showCaseData = '';
var homeData = '';
var adminSkillsData = '';
var adminProjectData = '';
var adminReorderData = '';

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
		//First insert the image
		projectBuffer += '<div class="my-showcase"><div class="my-showcase-left"><img id="my-screen" src="images/'+pjImageName[i]+'" class="my-screen"></div>';
		//Now insert the details
		projectBuffer += '<div class="my-showcase-right">Title</br><a href="#my-header">Back to top</a></br><a href="https://github.com/AboutTreeFittyy">Project on GitHub</a></br>';				
		for(var j = 0; j < skills.length; j++){
			projectBuffer += skills[j]+'  ';
		}		
		//finally insert the description
		projectBuffer += '</div><div class="my-showcase-bottom"><div class="my-details">'+descriptions[i]+'</div></div></div>';			
	}	
	showCaseData = '<div class="my-details">Feel free to browse and check out some of the projects Ive made</div><div class="my-top-showcase" id="mts"><div class="image-container"';
	showCaseData += 'id="image-container"><img id="current-image" src="images/'+pjImageName[0]+'" class="my-screen"><div class="caption-container"><div id="my-caption" class="my-caption">';
	showCaseData += caption[0]+'</div><div id="my-info" class="my-info">'+captionInfo[0]+'</div></div></div><div id="my-thumbnail" class ="my-thumbnail">';
	showCaseData += tnBuffer+'</div></div><div class="my-details">Scroll down to learn more</div>';
	showCaseData += projectBuffer;
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
	homeData += '</div></div><div class = "my-skills" id="skills">'+skillsSectionBuffer+'</div>';
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
	adminSkillsData = '';
	var skills = ['Techno', 'Apples', 'Ripping/Tearing'];
	//Add checkbox for each skill
	for(var i = 0; i < skills.length; i++){
		adminSkillsData += '<input type="checkbox" id="setProjectSkill'+i+'" name="skill   ">'+skills[i];
	}
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
	adminProjectData = '';
	var projects = ['This Project', 'C++++++', 'Ripping and Tearing'];
	
	//get data with ajax
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "getProjectData.php", true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var data = JSON.parse(this.responseText);
			for(var i = 0; i < data.length; i++){
				adminProjectData += '<input type="checkbox" id="deleteProjectSkill'+data[i].showcase_id+'" name="skill">'+data[i].Title;
			}
			document.getElementById('deleteProjects').innerHTML = adminProjectData;
			adminProjectData = data;
		}
	};
}
/* Uses the global adminReorderData variable to format and return usable
 * HTML to the caller for display.
*/
function getAdminReorderData(){
	return adminReorderData;
}
/* Accesses the database when called to retrieve the needed data for the reorder skills
 * admin area, then saves it formatted to the adminReorderData variable.
*/
function setAdminReorderData(){
	adminReorderData = '';
	var skills = ['Techno', 'Apples', 'Ripping/Tearing'];
	for(var i = 0; i < skills.length; i++){
		adminReorderData += '<div class="dropdown"><button class="drop">'+skills[i]+'</button><div class="dropdown-skills">';
		for(var j = 0; j < skills.length; j++){
			adminReorderData += '<a href="#">'+j+'</a>';
		}
		adminReorderData += '</div></div>';		
	}	
}
/* FileName: HTMLGenerator.js
 * Author: Mathew Boland
 * Date Modified: October 10th, 2019
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
var showCaseData;
var homeData;
var adminDeleteSkillsData;
var adminDeleteProjectData;
var adminReorderSkillsData;

/* Uses the global showCaseData variable to format and return usable
 * HTML to the caller for display.
*/
function getShowCaseData(){
	
}
/* Accesses the database when called to retrieve the needed data for
 * the ShowCase then saves it unformatted to the showCaseData variable.
*/
function setShowCaseData(showCaseData){
	
}
/* Uses the global homeData variable to format and return usable
 * HTML to the caller for display.
*/
function getHomeData(){
	
}
/* Accesses the database when called to retrieve the needed data for
 * the Home page then saves it unformatted to the homeData variable.
*/
function setHomeData(homeData){
	
}
/* Uses the global adminDeleteSkillsData variable to format and return usable
 * HTML to the caller for display.
*/
function getAdminDeleteSkillsData(){
	
}
/* Accesses the database when called to retrieve the needed data for the skill delete
 * admin area, then saves it unformatted to the adminDeleteSkillsData variable.
*/
function setAdminDeleteSkillsData(adminDeleteSkillsData){
	
}
/* Uses the global adminDeleteProjectData variable to format and return usable
 * HTML to the caller for display.
*/
function getAdminDeleteProjectData(){
	
}
/* Accesses the database when called to retrieve the needed data for the project delete
 * admin area, then saves it unformatted to the adminDeleteProjectData variable.
*/
function setAdminDeleteProjectData(adminDeleteProjectData){
	
}
/* Uses the global adminReorderSkillsData variable to format and return usable
 * HTML to the caller for display.
*/
function getAdminReorderSkillsData(){
	
}
/* Accesses the database when called to retrieve the needed data for the reorder skills
 * admin area, then saves it unformatted to the adminReorderSkillsData variable.
*/
function setAdminReorderSkillsData(adminReorderSkillsData){
	
}
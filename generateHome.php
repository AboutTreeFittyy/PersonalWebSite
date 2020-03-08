<?php
/*FileName: changeProjectOrder.php
 *Modified: March 6, 2020
 *About: This php file receives data about a new way to display the home page.
 * It then saves the home page with the new information.
*/
// Include the database configuration file
include 'config.php';
$msg = '';
$obj = json_decode($_POST["myData"]); //Get the content of the page
//Variables to hold top and bottom static parts of page
$top = '<!doctype html>
<html lang="en">
<meta charset="utf-8">
<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-151241454-1"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag("js", new Date());
	  gtag("config", "UA-151241454-1");
	</script>
		<title>Home</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header id="my-header">
		<div class="container">
			<ul><li>
				<a href="index.html">Home</a></li><li>
				<a href="ShowCase.html">Projects</a></li><li>				
				<a href="https://github.com/AboutTreeFittyy">GitHub</a></li><li>				
				<a href="https://www.linkedin.com/">LinkedIn</a></li><li>
				<a href="Game.html">Game</a></li><li>
			</li></ul>
		</div>		
	</header></br></br></br>
	<div class="container" id="pageData"> ';
	
$bottom = '</div>	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script> 
	<script type="text/javascript">
	/*Just a few simple functions to keep the site from messing up when it loads/resizes*/
	function fixHeader(){
		$head = $("#my-header");
		$pad = $head.css("padding-top");
		$pad = $pad.slice(0, -2);
		var bottom = $head.height()+(Number($pad)*2);
		$("#pageData").css({ top: bottom+"px", position: "relative" });
	}
	window.onresize = fixHeader;
	</script>
</body>
</html>';

$footer = '<footer id="my-footer"><p>Author: Mathew Boland - Last Updated: March 7, 2020</p></footer>';

$result = mysqli_query($con, "SELECT * FROM misc");
$miscData = array();
while ($row = mysqli_fetch_object($result)){
    array_push($miscData, $row);
}

$result = mysqli_query($con, "SELECT * FROM showcase_skill");
$joinData = array();
while ($row = mysqli_fetch_object($result)){
    array_push($joinData, $row);
}

$result = mysqli_query($con, "SELECT * FROM skill");
$skillData = array();
while ($row = mysqli_fetch_object($result)){
    array_push($skillData, $row);
}

$result = mysqli_query($con, "SELECT * FROM showcase");
$projectData = array();
while ($row = mysqli_fetch_object($result)){
    array_push($projectData, $row);
}

//loop through sections to add for every skill
for($i = 0; $i < sizeof($skillData); $i++){
	//Add each element of the skills list
	$skillsListBuffer .= '<li><a href="#' . $skillData[$i]->Title . '">' . $skillData[$i]->Title . '</a></li>';
	//More complex now, add each skill and its details to my skills section div
	$skillsSectionBuffer .= '<div class="my-skill" id="' . $skillData[$i]->Title . '"><h2>' . $skillData[$i]->Title . '</h2>';
	$skillsSectionBuffer .= $skillData[$i]->Description . '</br>';
	for($j = 0; $j < sizeof($joinData); $j++){
		//found current skill in join table
		if($joinData[$j]->skill_id === $skillData[$i]->skill_id){
			//Now find what project it belongs to
			for($k = 0; $k < sizeof($projectData); $k++){
				//try to match the project id with the one found in the join table
				if($joinData[$j]->showcase_id === $projectData[$k]->showcase_id){
					//Found project with this skill so add it
					$skillsSectionBuffer .= '<a href="#my-header">' . $projectData[$k]->Title . '</a>';
				}											
			}
		}									
	}
	$skillsSectionBuffer .= '</br></div>';
}
//add image name and my name
$homeData .= '<div class="my-home"><div class="my-home-left"><img id="my-screen" src="images/' . $miscData[0]->Image . '" class="my-screen"></div><div class="my-home-right"></br><h2>' . $miscData[0]->Name . '</h2></br>';
//add description and then skill list
$homeData .= $miscData[0]->About . '</br></br>More on what I do:<ul id="skill-list">' . $skillsListBuffer . '</ul>';
//add skills section now
$homeData .= '</div></div><div class = "my-skills" id="skills">' . $skillsSectionBuffer . '</div><div id="spacefooter"></div>';
$homeData .= $footer;

$filename = "index.html";
//empty the file  it isn't appended to
if (file_exists($filename)) {    
    $fp = fopen($filename, 'w');  
    fclose($fp);
}

//Open the home pages html file for editing
if (is_writable($filename)) {
	if (!$myfile = fopen($filename, 'a')) {
			 echo "Cannot open file ($filename)";
			 exit;
	}
	// Write page data to opened file.
	if (fwrite($myfile, $top) === FALSE) {
		echo "Cannot write to file ($filename)";
		exit;
	}
	if (fwrite($myfile, $homeData) === FALSE) {
		echo "Cannot write to file ($filename)";
		exit;
	}
	if (fwrite($myfile, $bottom) === FALSE) {
		echo "Cannot write to file ($filename)";
		exit;
	}
	fclose($myfile);
}else{
		echo "The file $filename is not writable";
}

//Show error/success message
//echo $msg.var_dump($projectData);
?>
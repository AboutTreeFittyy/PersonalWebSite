/* File Name: AnimationManager.js
 * Author: Mathew Boland
 * Last Updated: December 1, 2019
 * Description: A class to initialize all the different animations. To keep it organized 
 * and easy to maintain.
*/


var scene;

function setSceneAnims(sc){
	scene = sc;
}

//Create all the animations for all the sprites in the game
function setAnimations(){
	//Chad sprites animation
	createAnimation("chadleft", 10, CST.SPRITE.CHAD, 0, 3, false);
	createAnimation("chadright", 10, CST.SPRITE.CHAD, 4, 7, false);
	createAnimation("chaddown", 10, CST.SPRITE.CHAD, 0, 3, false);
	createAnimation("chadup", 10, CST.SPRITE.CHAD, 4, 7, false);
	createAnimation("chadFlex", 10, CST.SPRITE.CHAD, 8, 15, false);
	//Vlad sprites animation
	createAnimation("Vladleft", 10, CST.SPRITE.VLAD, 0, 3, false);
	createAnimation("Vladright", 10, CST.SPRITE.VLAD, 4, 7, false);
	createAnimation("Vladdown", 10, CST.SPRITE.VLAD, 0, 3, false);
	createAnimation("Vladup", 10, CST.SPRITE.VLAD, 4, 7, false);
	createAnimation("VladCry", 10, CST.SPRITE.VLAD, 8, 15, false);
	//Nerd variant 1 animations
	createAnimation("nerd1left", 15, CST.SPRITE.NERD1, 5, 7, false);
	createAnimation("nerd1right", 15, CST.SPRITE.NERD1, 9, 11, false);
	createAnimation("nerd1down", 15, CST.SPRITE.NERD1, 1, 3, false);
	createAnimation("nerd1up", 15, CST.SPRITE.NERD1, 13, 15, false);
	//Nerd variant 2 animations
	createAnimation("nerd2left", 15, CST.SPRITE.NERD2, 5, 7, false);
	createAnimation("nerd2right", 15, CST.SPRITE.NERD2, 9, 11, false);
	createAnimation("nerd2down", 15, CST.SPRITE.NERD2, 1, 3, false);
	createAnimation("nerd2up", 15, CST.SPRITE.NERD2, 13, 15, false);
	//NerdGirl animations
	createAnimation("nerdgirlleft", 15, CST.SPRITE.NERDGIRL, 5, 7, false);
	createAnimation("nerdgirlright", 15, CST.SPRITE.NERDGIRL, 9, 11, false);
	createAnimation("nerdgirldown", 15, CST.SPRITE.NERDGIRL, 1, 3, false);
	createAnimation("nerdgirlup", 15, CST.SPRITE.NERDGIRL, 13, 15, false);
	//Jason enemy animations
	createAnimation("jasonleft", 10, CST.SPRITE.NPC_LOT, 15, 17, false);
	createAnimation("jasonright", 10, CST.SPRITE.NPC_LOT, 27, 29, false);
	createAnimation("jasondown", 10, CST.SPRITE.NPC_LOT, 3, 5, false);
	createAnimation("jasonup", 10, CST.SPRITE.NPC_LOT, 39, 41, false);
	//NicoleD npc walking animations
	createAnimation("NicoleDleft", 15, CST.SPRITE.NICOLED, 5, 7, false);
	createAnimation("NicoleDright", 15, CST.SPRITE.NICOLED, 9, 11, false);
	createAnimation("NicoleDdown", 15, CST.SPRITE.NICOLED, 1, 3, false);
	createAnimation("NicoleDup", 15, CST.SPRITE.NICOLED, 13, 15, false);
	//Nicole npc walking sprites
	createAnimation("Nicoledown", 10, CST.SPRITE.NPC_LOT, 6, 8, false);
	createAnimation("Nicoleleft", 10, CST.SPRITE.NPC_LOT, 18, 20, false);
	createAnimation("Nicoleright", 10, CST.SPRITE.NPC_LOT, 30, 32, false);
	createAnimation("Nicoleup", 10, CST.SPRITE.NPC_LOT, 42, 44, false);
	//Claire1 npc walking sprites
	createAnimation("Claire1down", 10, CST.SPRITE.NPC_LOT, 48, 50, false);
	createAnimation("Claire1left", 10, CST.SPRITE.NPC_LOT, 60, 62, false);
	createAnimation("Claire1right", 10, CST.SPRITE.NPC_LOT, 72, 74, false);
	createAnimation("Claire1up", 10, CST.SPRITE.NPC_LOT, 84, 86, false);
	//Claire2 npc walking sprites
	createAnimation("Claire2down", 10, CST.SPRITE.NPC_LOT, 9, 11, false);
	createAnimation("Claire2left", 10, CST.SPRITE.NPC_LOT, 21, 23, false);
	createAnimation("Claire2right", 10, CST.SPRITE.NPC_LOT, 33, 35, false);
	createAnimation("Claire2up", 10, CST.SPRITE.NPC_LOT, 45, 47, false);
	//Kyle npc walking animations
	createAnimation("Kyleleft", 15, CST.SPRITE.KYLE, 4, 7, false);
	createAnimation("Kyleright", 15, CST.SPRITE.KYLE, 8, 11, false);
	createAnimation("Kyledown", 15, CST.SPRITE.KYLE, 0, 3, false);
	createAnimation("Kyleup", 15, CST.SPRITE.KYLE, 12, 15, false);
	//Brad npc walking animations
	createAnimation("Bradleft", 15, CST.SPRITE.BRAD, 4, 7, false);
	createAnimation("Bradright", 15, CST.SPRITE.BRAD, 8, 11, false);
	createAnimation("Braddown", 15, CST.SPRITE.BRAD, 0, 3, false);
	createAnimation("Bradup", 15, CST.SPRITE.BRAD, 12, 15, false);
	//Stevie npc walking animations
	createAnimation("Stevieleft", 15, CST.SPRITE.STEVIE, 9, 17, false);
	createAnimation("Stevieright", 15, CST.SPRITE.STEVIE, 28, 36, false);
	createAnimation("Stevieup", 15, CST.SPRITE.STEVIE, 0, 8, false);
	createAnimation("Steviedown", 15, CST.SPRITE.STEVIE, 18, 26, false);
	//Prof npc walking sprites
	createAnimation("Profdown", 10, CST.SPRITE.NPC_LOT, 51, 53, false);
	createAnimation("Profleft", 10, CST.SPRITE.NPC_LOT, 63, 65, false);
	createAnimation("Profright", 10, CST.SPRITE.NPC_LOT, 75, 77, false);
	createAnimation("Profup", 10, CST.SPRITE.NPC_LOT, 87, 89, false);
	//My poorly made whip sprites       
	createAnimation("whip_left", 15, CST.SPRITE.WHIP, 17, 22, true);
	createAnimation("whip_up", 15, CST.SPRITE.WHIP, 8, 11, true);        
	createAnimation("whip_right", 15, CST.SPRITE.WHIP, 12, 15, true);
	createAnimation("whip_down", 15, CST.SPRITE.WHIP, 0, 4, true);
	createAnimation("redwhip_left", 15, CST.SPRITE.WHIP, 41, 46, true);
	createAnimation("redwhip_up", 15, CST.SPRITE.WHIP, 32, 35, true);        
	createAnimation("redwhip_right", 15, CST.SPRITE.WHIP, 36, 39, true);
	createAnimation("redwhip_down", 15, CST.SPRITE.WHIP, 24, 28, true);
	//Player attacking animation
	createAnimation("attackleft", 15, CST.SPRITE.PLAYER, 169, 174, false);
	createAnimation("attackup", 15, CST.SPRITE.PLAYER, 156, 161, false);
	createAnimation("attackright", 15, CST.SPRITE.PLAYER, 195, 200, false);
	createAnimation("attackdown", 15, CST.SPRITE.PLAYER, 182, 187, false);     
	//Player directional movements
	createAnimation("left", 10, CST.SPRITE.PLAYER, 117, 125, false);
	createAnimation("right", 10, CST.SPRITE.PLAYER, 143, 151, false);
	createAnimation("up", 10, CST.SPRITE.PLAYER, 104, 112, false);
	createAnimation("down", 10, CST.SPRITE.PLAYER, 130, 138, false);
	//Player death animation
	createAnimation("die", 10, CST.SPRITE.PLAYER, 260, 265, false);
	//Player death animation
	createAnimation("win", 10, CST.SPRITE.PLAYER, 26, 32, false);
}

function createAnimation(k, fr, cst, st, fin, hide){
	if(hide == true){
		scene.anims.create({
			key: k,
			frameRate: fr,
			frames: scene.anims.generateFrameNumbers(cst, {
				start: st,
				end: fin
			}),
			showOnStart: true,
			hideOnComplete: true
		});
	}else{
		scene.anims.create({
			key: k,
			frameRate: fr,
			frames: scene.anims.generateFrameNumbers(cst, {
				start: st,
				end: fin
			})
		});
	}
}


/* File Name: Sprite.js
 * Author: Mathew Boland
 * Last Updated: November 17, 2019
 * Description: Class used to create and hold the value of a Sprite object
*/
class Sprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, down, up, left, right, name) {
        super(scene, x, y, texture, left);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);     
        scene.physics.world.enableBody(this);
        this.down = down;
        this.rep = 1000;
        this.up = up;
        this.left = left;
        this.right = right;
        this.startX = x;
        this.startY = y;
        this.name = name;
        this.state = 0;
    }

    //Starts a conversation in the TalkScene when a player collides with an NPC and presses E
    npcSpeak(player, npc){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            player.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    //Makes an NPC have enemy traits like health, attack sounds and a collider for player weapons
    makeNPCAgro(player, npc){
        //Make Chad destroyable
        this.rep = 30;
        player.scene.physics.add.collider(player.scene.whip, npc, player.scene.whip.whipHitEnemy, null, this);
        if(npc.name=="chad"){
            npc.scene.sound.play(CST.AUDIO.CHAD, {
                loop: true
            })
        }else if(npc.name=="Vlad"){
            npc.scene.sound.play(CST.AUDIO.VLAD, {
                loop: true
            })
        }
    }

    //Callback for Boss timer to attack again
    npcAttack(player, go){
        go.state = 5;
    }
}
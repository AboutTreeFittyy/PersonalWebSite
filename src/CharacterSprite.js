/* File Name: CharacterSprite.js
 * Author: Mathew Boland
 * Last Updated: December 9, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);        
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        //PingPong weapon stats
        this.balls = 3; // Current number of balls available
        this.maxBalls = 3; //Max player can have
        //Whip upgrade
        this.whipUpgrade = 0;
        //Player stats
        this.rep = 10; //DVDs increase this as player health
        this.repMax = 10;
        this.knowledgeNeeded = 1; ////Exam sheets increase this as player level
        this.knowledgeProgress = 0;
        this.knowledgeLevel = 0;
        this.will = 10; //Energy Drinks increase this as the players stamina
        this.willMax = 10;
        this.money = 5;
        this.lives = 4; //Lives to be displayed as grades
        this.maskChad = false; //Whether or not Chad mask obtained
    }

    //Enters the shop scene when player collides with it and presses E
    enterShop(player){
        //If the e button is pressed then begin shop scene
        if (player.scene.keyboard.E.isDown) {
            player.scene.scene.launch(CST.SCENES.SHOP, player);
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    //Collider for items to have them be collected and destroyed
    collectItem(player, item){
        player.addItem(player, item.name);
        //Picked up so destroy it
        item.setVisible(false);
        item.destroy(item.body);        
    }

    //Adds the given item to the inventory 
    //Chad mask items make this change around teh games states so that all stages are available
    addItem(player, name){
        //Find out which item was grabbed
        switch(name){
            case "dvd": //Got DVD
            if(player.rep < player.repMax){
                player.rep++;
            }
            break;
            case "examsheet": //Got Exam Sheet
            //Check that max level isnt reached
            if(player.knowledgeLevel < 5){
                //Increase xp and then if its full, level up player
                player.knowledgeProgress++;
                if(player.knowledgeProgress == player.knowledgeNeeded){
                    //Level up player
                    player.knowledgeLevel++;
                    //Increment stats by 5 times the player level
                    player.willMax = player.willMax + player.knowledgeLevel * 5;
                    player.repMax = player.repMax + player.knowledgeLevel * 5;
                    //Fill stats to new max at start of new knowledge level
                    player.will = player.willMax;
                    player.rep = player.repMax;
                    //Reset knowledge progress and double the needed progress to the next level
                    player.knowledgeProgress = 0;
                    player.knowledgeNeeded = player.knowledgeNeeded * 2;
                }
            }
            break;
            case "money": //Got Money
            //Limit money to max of 99
            if(player.money < 99){
                player.money++;
            }
            break;
            case "energy": //Got Energy Drink
            if(player.will < player.willMax){
                player.will++;
            }
            break;
            case "mask":
                //Unlock all doors except exam
                player.scene.claireRoom.visible = false;
                player.scene.claireRoomCollider.active = false;
                player.scene.chadRoom.visible = false;
                player.scene.chadRoomCollider.active = false;
                player.scene.vladRoom.visible = false;
                player.scene.vladRoomCollider.active = false;
                //Hide Claire in case they haven't progressed far enough for her to anyway
                let claire1 = getNPC("Claire1");
                claire1.x = 0;
                claire1.y = 0;
                claire1.startX = 0;
                claire1.startY = 0;
                claire1.state = 2; //This way they can still fight chad if they want                
                //Have Nicole/NicoleD tell you what it does
                let nicole = getNPC("Nicole");
                //Have Nicole tell player is shes active/visible
                if(nicole.visible){
                    nicole.state = 10;
                    player.scene.keyboard.E.isDown = true;
                    nicole.npcSpeak(player, nicole);
                }else{
                    //Have NicoleD tell player because Nicole is done
                    let nicoled = getNPC("NicoleD");
                    nicoled.state = 10;
                    player.scene.keyboard.E.isDown = true;
                    nicoled.npcSpeak(player, nicoled);
                }
                player.maskChad = true;
        }
        player.displayInventory();
    }

    //Updates the inventory cmd with current stats
    displayInventory(){
        let invBuffer = '';
        invBuffer = "C:/Users/Player/Stats/";
        switch(this.lives){
            case 1: invBuffer += "\n\n    <GRADE>                   D";
                break;
            case 2: invBuffer += "\n\n    <GRADE>                   C";
                break;
            case 3: invBuffer += "\n\n    <GRADE>                   B";
                break;
            case 4: invBuffer += "\n\n    <GRADE>                   A";
                break;
        }        
        invBuffer += "\n\n    <LEVEL>                   "+this.knowledgeLevel;
        invBuffer += "\n\n    <KNOWLEDGE>      "+this.knowledgeProgress+" / "+this.knowledgeNeeded;
        invBuffer += "\n\n    <WILLPOWER>      "+this.will+" / "+this.willMax;
        invBuffer += "\n\n    <REPUTATION>      "+this.rep+" / "+this.repMax;
        invBuffer += "\n\n    <MONEY>                $"+this.money;
        invBuffer += "\n\n    <PINGPONGS>           "+this.balls+"/"+this.maxBalls;
        this.scene.cmd1Text.text = invBuffer;
    }

    //Drops a random item (excluding chad mask) where enemy died
    dropLoot(enemy){
        let rand = randomNum(0, 3);
        let name= '';
        if(rand == 0){
            name = "dvd";
        }else if(rand == 1){
            name = "examsheet";
        }else if(rand == 2){
            name = "money";
        }else if(rand == 3){
            name = "energy";
        }
        let sprite = new Sprite(enemy.scene, enemy.x, enemy.y, CST.SPRITE.ITEM, 0, 0, rand, 0, name);
		itemSet.add(sprite);
		sprite.setSize(32,32);
		sprite.body.setOffset(0,0);
    }

    //Decreases enemy health and destroys them if they run out 
    whipHitEnemy(whip, enemy){
        //check if already got hit this animation
        if(!whip.state){
            //Play sound effect
            whip.scene.sound.play(CST.AUDIO.WHIPHIT, {
                loop: false
            })
            //adjust enemy stats on hit from whip
            if(whip.scene.player.whipUpgrade > 0){
                enemy.rep--;
                enemy.rep--;
            }else{
                enemy.rep--;
            }
            if(enemy.rep <= 0){
                if(enemy.name == "chad"){                    
                    whip.startNextSemester(whip, enemy);
                }else if(enemy.name == "Vlad"){                    
                    whip.endGame(whip, enemy);
                }else{
                    whip.dropLoot(enemy);
                    enemy.destroy();
                }                
            }
            whip.setState(1); //indicate a hit already occured
        }        
    }

    //This triggers the final dialogue with NicoleD and puts Claire2 into game end state
    endGame(weapon, enemy){
        enemy.scene.sound.removeByKey(CST.AUDIO.VLAD); //Stop vlads sound
        enemy.x = 0;
        enemy.y = 0;
        enemy.startX = 0;
        enemy.startY = 0;
        //Start convo with nicoled
        let nicoled = getNPC("NicoleD");
        nicoled.state = 5;
        enemy.scene.keyboard.E.isDown = true;
        nicoled.npcSpeak(enemy.scene.player, nicoled);
        //Change claire2 to final playing state to end game convo
        getNPC("Claire2").state = 5;
    }

    //This pauses the scene and starts up the winning scene after Claire2 is talked to in state 5
    winGame(player){
        //Play death sound effect
        player.visible = false;
        player.scene.sound.pauseAll();
        player.scene.sound.play(CST.AUDIO.WIN, {
            volume: 0.5,
            loop: false
        })
        //Enter the game over scene (LoseScene)
        player.scene.scene.pause();
        player.scene.scene.launch(CST.SCENES.WIN, player.scene);
    }

    //This begins the next semester and third stage by setting Nicole into her final state
    startNextSemester(weapon, enemy){
        enemy.scene.sound.removeByKey(CST.AUDIO.CHAD); //Stop chads sound
        enemy.x = 0;
        enemy.y = 0;
        enemy.startX = 0;
        enemy.startY = 0;
        //Start next semester
        let player = weapon.scene.player;
        let nicole = getNPC("Nicole");
        nicole.state = 4; //TalkScene will set this to 5 when done and trigger more in the update sprites function in levelmanager
        player.scene.keyboard.E.isDown = true;
        nicole.npcSpeak(player, nicole); 
        player.scene.scene.pause();
    }

    //This decrements enemy health or destroys them if they run out
    ballHitEnemy(ball, enemy){
        //adjust inventory and enemy stats on hit from ball
        enemy.scene.player.balls++;
        ball.scene.player.displayInventory();
        enemy.rep--;
        //Play sound effect
        ball.scene.sound.play(CST.AUDIO.BALLHIT, {
            loop: false
        })
        if(enemy.rep == 0){            
            if(enemy.name == "chad"){
                ball.startNextSemester(ball, enemy);
            }else if(enemy.name == "Vlad"){                    
                ball.endGame(ball, enemy);
            }else{
                ball.dropLoot(enemy);
                enemy.destroy();
            }            
        }
        ball.destroy();
    }

    //This destroys the ball when it hits a wall or if the timer runs out
    ballHitWall(ball, wall){
        //timer calls this even if its been deleted so make sure it still exists
        if(ball.scene != null){            
            ball.scene.player.balls++;
            ball.scene.player.displayInventory();
            ball.destroy();
        }        
    }

    //This triggers the dialogue with extra large chick when the claire room is blocked
    claireBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.extralarge;
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

    //This triggers the dialogue with the skinny chick when the chad room is blocked
    chadBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.skinny;
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

    //This triggers the large chicks dialogue when the vlad room is blocked
    vladBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.large;
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

    //This triggers the medium chick dialogue when the exam room is blocked
    examBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.medium;
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

    //This decreases the players will when the timer triggers it, then makes another timer to do the same
    decrementWill(player){
        //Make sure there is some will to lose before decrementing 
        if(player.will > 0){
            player.will--;
            player.displayInventory();
        }  
        //recursively call function continuously so its always happening      
        player.scene.time.delayedCall(15000, player.decrementWill, [player], player.scene);
    }
}
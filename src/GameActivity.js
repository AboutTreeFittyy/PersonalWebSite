const CST  = {
	SCENES:{
		FIRSTLEVEL: "FIRSTLEVEL",
		LOAD: "LOAD",
		MENU: "MENU",
		PAUSE: "PAUSE",
		SHOP: "SHOP",
		TALK: "TALK",
		LOSE: "LOSE",
		WIN: "WIN"	
	},
	IMAGE: {
		ENCODEDLIVING: "encodedliving.png",
		LOADGAME: "loadgame.png",
		LOAD: "load.png",
		PASSWORD: "password.png",
		STARTNEWGAME: "startnewgame.png",
		TITLE: "title.jpg",
		PAUSED: "paused.png",
		RESUME: "resume.png",
		RESTART: "restart.png",
		CMD: "cmd.png",
		SHOP: "shop.png",
		FIDDY: "fiddy.png",
		EXIT: "exit.png",
		CONTINUE: "continue.png",
		GRADUATED: "graduated.png",
		DROPPED: "droppedout.png",
		MENU: "mainmenu.png",
		ENERGY: "energy.png",
		DVD: "dvd.png",
		EXAM: "examSheet.png",
		DECREASE: "gradedecreased.png",
		WHIPUPGRADE: "whipupgrade.png",
		SOLDOUT: "soldout.png",
		DIALOGUE: "talkbubble.png"
	},
	AUDIO:{
		THEME1: "level_1_theme.mp3",
		TITLE: "title_music.mp3",
		JSON: "json.mp3",
		CHAD: "chadFlex.mp3",
		VLAD: "vladCry.mp3",
		DEATH: "death.mp3",
		WIN: "win.mp3",
		PLAYERHIT: "playerHit.mp3",
		BALLHIT: "ballHit.mp3",
		WHIPHIT: "whipHit.mp3",
		THROW: "throw.mp3",
		WHIP: "whip.mp3"
	},
	SPRITE:{
		PLAYER: "player.png",
		WHIP: "whip.png",
		BALL: "pingpong.png",
		NPC_LOT: "npc_lot.png",
		CHAD: "chadsprite.png",
		HOTSTUFF: "hotStuff.png",
		VLAD: "vlad.png",
		PATHETIC: "pathetic.png",
		KYLE: "kyle.png",
		BRAD: "brad.png",
		STEVIE: "stevie.png",
		NICOLED: "nicolecreepy.png",
		ITEM: "itemsall.png",	
		NERD1: "nerd1.png",
		NERD2: "nerd2.png",	
		JSON: "json.png",	
		FAT: "fat.png",		
		NERDGIRL: "nerdgirl.png"		
	}
}
var MenuScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function MenuScene (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.MENU,
            //active: true,
            physics: {
				default: "arcade"
			}
        });
    },	
	create: function(){
		//Stuff for password entry
		let password = null;
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.ENCODEDLIVING).setDepth(1);
		let title = this.add.image(this.game.renderer.width / 2,0,CST.IMAGE.TITLE);
		title.setY(title.height/2);
		let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.STARTNEWGAME).setDepth(1);
		let loadGameButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +100, CST.IMAGE.LOADGAME).setDepth(1);
		//create sprites
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
		//animate sprites
		this.anims.create({
			key: "walk",
			frameRate: 5,
			repeat: -1,
			yoyo: true,
			frames: this.anims.generateFrameNumbers(CST.SPRITE.FAT, {
				start: 0,
				end: 11
			})
		})
		//create sounds for menu... commented out for the time being as its annoying
		this.sound.play(CST.AUDIO.TITLE, {
			volume: 0.25,
			loop: true
		})
		//make start button interactive
		startButton.setInteractive();

		startButton.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = startButton.x - startButton.width / 2 - 50;
			hoverSprite.y = startButton.y;
		})
		startButton.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		startButton.on("pointerup", ()=>{
			this.sound.pauseAll();
			this.scene.stop();
			this.scene.start(CST.SCENES.FIRSTLEVEL, {password});
		})
		//Make load button interactive (currently no load capability in this version so commented out)
		loadGameButton.setInteractive();
		loadGameButton.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = loadGameButton.x - loadGameButton.width / 2 - 50;
			hoverSprite.y = loadGameButton.y;
		})
		loadGameButton.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		loadGameButton.on("pointerup", ()=>{
			//Change menu layout to be for loading a game
			startButton.setVisible(false);
			loadGameButton.setVisible(false);
			hoverSprite.setVisible(false);
			let pw = this.add.image(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2, CST.IMAGE.PASSWORD).setDepth(1);
			let exitButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.85, CST.IMAGE.EXIT).setDepth(1);
			let loadButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, CST.IMAGE.LOAD).setDepth(1);
			this.keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
			let pwField = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 - 20, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(3);
			pwField.setColor("green");
			//Create all the bindings for the keys to enter in the text for a password
			for(let i = 0; i < 26; i++){
				this.input.keyboard.on('keyup-'+this.keys[i], ()=>{
					if(pwField.text.length < 10){
						pwField.text += this.keys[i];
					}
				})
			}
			//make backspace delete the end character of the string
			this.input.keyboard.on('keyup-BACKSPACE', ()=>{
				pwField.text = pwField.text.substring(0, pwField.text.length - 1);;
			})
			//Make exit button interactive to return to main part of menu if clicked
			exitButton.setInteractive();
			exitButton.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = exitButton.x - exitButton.width / 2 - 50;
				hoverSprite.y = exitButton.y;
			})
			exitButton.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			exitButton.on("pointerup", ()=>{
				startButton.setVisible(true);
				loadGameButton.setVisible(true);
				loadButton.setVisible(false);
				exitButton.setVisible(false);
				pw.setVisible(false);
				pwField.setVisible(false);
				hoverSprite.setVisible(false);
			})
			//Make load button interactive to return to main part of menu if clicked
			loadButton.setInteractive();
			loadButton.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = loadButton.x - loadButton.width / 2 - 50;
				hoverSprite.y = loadButton.y;
			})
			loadButton.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			loadButton.on("pointerup", ()=>{
				//Check if password is valid
				let pw = decodePassword(pwField.text);
				//If valid then load game with it
				if(pw != null){
					password = pw;
					this.sound.pauseAll();
					this.scene.stop();
					this.scene.start(CST.SCENES.FIRSTLEVEL, {password});
				}else{
					//Not valid, delete entry 
					pwField.text = '';
				}

			})			
		})
	},
	loadImages: function (){
		this.load.setPath("./assets/image");
		//load all images in CST images
		for(let prop in CST.IMAGE){
			this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
		}
	},	
	loadAudio: function (){
		this.load.setPath("./assets/audio");
		//load all audio in CST audio
		for(let prop in CST.AUDIO){
			this.load.audio(CST.AUDIO[prop], CST.AUDIO[prop]);
		}
	},
	loadSprites: function (){
		this.load.setPath("./assets/sprite");
		//load all sprites in CST sprites, if statements switch on which image is meant to be a certain size
		for(let prop in CST.SPRITE){
			if(CST.SPRITE[prop] == CST.SPRITE.PLAYER){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 64,
					frameWidth: 64
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.CHAD || CST.SPRITE[prop] == CST.SPRITE.VLAD || CST.SPRITE[prop] == CST.SPRITE.FAT ){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 96,
					frameWidth: 64
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.BALL || CST.SPRITE[prop] == CST.SPRITE.ITEM || CST.SPRITE[prop] == CST.SPRITE.WHIP || CST.SPRITE[prop] == CST.SPRITE.WHIPRED){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 32,
					frameWidth: 32
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.KYLE){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 48,
					frameWidth: 32
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.JSON){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 48,
					frameWidth: 160
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.HOTSTUFF || CST.SPRITE[prop] == CST.SPRITE.PATHETIC){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 320,
					frameWidth: 90
				});
			}else if(CST.SPRITE[prop] == CST.SPRITE.BRAD){
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 80,
					frameWidth: 48
				});
			}else{
				this.load.spritesheet(CST.SPRITE[prop], CST.SPRITE[prop], {
					frameHeight: 64,
					frameWidth: 48
				});
			}		
		}
	},
    preload: function (){
        //this.scene.stop(CST.SCENES.FIRSTLEVEL);
		//load assets
		this.loadImages();
		this.loadAudio();
		this.loadSprites();
		let loadingBar = this.add.graphics({
			fillStyle:{
				color: 0xffffff
			}
		})
		//display loading bar
		this.load.on("progress", (percent)=>{
			loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
		})

		//load menu when complete
		this.load.on("complete", ()=>{
			loadingBar.visible = false;
		})		
    }
});
var FirstLevel = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function FirstLevel (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.FIRSTLEVEL,
            //active: false,
            physics: {
				default: "arcade"
			}
        });
    },	
	init: function(data){
		//Get data from menu scene that indicates if we need to load from a password or not
		this.password = data.password;
    },
    
	create: function(){
        //start up the theme for level, commenting out now cause its annoying 
		this.sound.play(CST.AUDIO.THEME1, {
            volume: 0.25,
            loop: true
        })       
        //Set up tiled map
        let mappy = this.add.tilemap("FirstLevel");
        let terrain1 = mappy.addTilesetImage("ground1");
        let terrain2 = mappy.addTilesetImage("ground2"); 
        let terrain3 = mappy.addTilesetImage("ground3");      
        let holster = mappy.addTilesetImage("holster"); 
        let lightwood = mappy.addTilesetImage("lightwood");  
        let fat = mappy.addTilesetImage("fat");   
        //layers
        mappy.createStaticLayer("bottom_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(-1);
        this.shopLayer = mappy.createStaticLayer("shop_layer", terrain1, 0, 0).setDepth(-1);
        this.furnishing = mappy.createStaticLayer("furnishing", [holster, lightwood, terrain2], 0, 0).setDepth(2);
        this.topLayer = mappy.createStaticLayer("top_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(2);
        this.claireRoom = mappy.createStaticLayer("claireRoom", fat, 0, 0).setDepth(1);
        this.chadRoom = mappy.createStaticLayer("chadRoom", fat, 0, 0).setDepth(1);
        this.vladRoom = mappy.createStaticLayer("vladRoom", fat, 0, 0).setDepth(1);
        this.examRoom = mappy.createStaticLayer("examRoom", fat, 0, 0).setDepth(1);
        //Create the level using this scene and the map made above
        startLevel(this, mappy); 
        //map collisions
        this.physics.add.collider(this.player, this.topLayer);
        this.physics.add.collider(this.player, this.furnishing);
        //add whip colliders for enemies
        this.physics.add.collider(this.enemySet, this.whip, this.whip.whipHitEnemy, null, this);
        //add colliders for chick blocks        
        this.claireRoom.setCollisionByProperty({collides:true});
        this.chadRoom.setCollisionByProperty({collides:true});
        this.vladRoom.setCollisionByProperty({collides:true});
        this.examRoom.setCollisionByProperty({collides:true});
        this.claireRoomCollider = this.physics.add.collider(this.player, this.claireRoom, this.player.claireBlocked, null, this);
        this.examRoomCollider = this.physics.add.collider(this.player, this.examRoom, this.player.examBlocked, null, this);
        this.chadRoomCollider = this.physics.add.collider(this.player, this.chadRoom, this.player.chadBlocked, null, this);
        this.vladRoomCollider = this.physics.add.collider(this.player, this.vladRoom, this.player.vladBlocked, null, this);        
        //create chick blocks sprites for talking
        this.skinny = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"skinny");
        this.medium = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"medium");
        this.large = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"large");
        this.extralarge = new Sprite(this,0,0,CST.SPRITE.FAT,0,0,0,0,"extralarge");
        //add colliders for terrain
        this.topLayer.setCollisionByProperty({collides:true});  
        this.furnishing.setCollisionByProperty({collides:true});
        //Set collider handler for the shop entrance
        this.shopLayer.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.player, this.shopLayer, this.player.enterShop, null, this);
        //Set Nicoled flag to be invisible
        let nicoled = getNPC("NicoleD");
        nicoled.state = 9;
        //this makes sure if claire2 hasn't been talked to yet then give her new dialogue so it doesn't throw sequence 
        //out of order totally. Also she'll drop exams endlessly so the player can speed through the game when you have chad mask
        let claire2 = getNPC("Claire2");
        claire2.state = 7;         
        //progress tracking flags
        this.finished1 = false;   
        this.finished2 = false;   
        this.finished3 = false;   
        this.finished4 = false;  
        //Check if game is being loaded using a password or not   
        if(this.password != null){
            //Load game
			usePassword(this.password, this, this.player); //Load the game with the given password
        }else{
            //New game
            //start talk with nicole
            let nicole = getNPC("Nicole");
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
        }
		//this.scene.resume(CST.SCENES.FIRSTLEVEL);
    }, 

    /*This progress check, checks the following: If the player has talked to Chad
    * and Kyle. And if the player has reached the first level. Then it gets rid of the
    * blocker to the cooking class. Nicole then informs the player this is available 
    * when the check passes.
    */
    checkProgress1: function(){
        let chad = getNPC("chad");
        let kyle = getNPC("Kyle");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished1 == false && chad.state > 0 && kyle.state > 0 && this.player.knowledgeLevel >= 1){
            let nicole = getNPC("Nicole");
            nicole.state = 2;
            //hide blocker and remove their collider
            this.claireRoom.visible = false;
            this.claireRoomCollider.active = false;
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
            this.finished1 = true;
        } 
    },

    /*This blocker checks that the player has talked to Claire, Stevie and Brad. It also checks if the player is level 2 yet.
    * If these conditions are met then it unblocks the exam room and moves Chad to his fighting position there. Nicole then
    * informs the player this is available when the check passes.
    */
    checkProgress2: function(){
        let stevie = getNPC("Stevie");
        let claire = getNPC("Claire1");
        let brad = getNPC("Brad");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished2 == false && stevie.state > 0 && claire.state > 0 && brad.state > 0 && this.player.knowledgeLevel >= 2){  
            let nicole = getNPC("Nicole");
            let chad = getNPC("chad");
            nicole.state = 3; //4th state is her at chad fight
            //hide blocker and remove their collider
            this.examRoom.visible = false;
            this.examRoomCollider.active = false;
            this.player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(this.player, nicole);  
            //Move chad to 6200,4020 in the exam room and set him to fight mode
            chad.x = 6600;
            chad.y = 4020;
            chad.startX = 6600;
            chad.startY = 4020;
            chad.state = 4; //Fight state
            this.finished2 = true;
        } 
    },

    /*This progress check is for after the first boss fight with Chad, which should open Vlads room. This check unlocks 
    * Vlads room if you have talked to Claire2 and Kyle this semester. You also must be level 3 to pass the check.
    * NicoleD informs the player this is available when the check passes.
    */
    checkProgress3: function(){
        let claire2 = getNPC("Claire2");
        let kyle = getNPC("Kyle");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished3 == false && kyle.state > 4 && claire2.state > 1 && this.player.knowledgeLevel >= 3){
            let nicoled = getNPC("NicoleD");
            nicoled.state = 3;
            //hide blocker and remove their collider
            this.vladRoom.visible = false;
            this.vladRoomCollider.active = false;
            this.player.scene.keyboard.E.isDown = true;
            nicoled.npcSpeak(this.player, nicoled);  
            this.finished3 = true;
        } 
    },

    /*This progress check is for unlocking the final exam and boss fight with Vlad. This makes sure you have talked to 
    * Stevie again and Vlad before entering as well as being level 4. NicoleD informs player this is ready when the check passes.
    */
    checkProgress4: function(){
        let stevie = getNPC("Stevie");
        let vlad = getNPC("Vlad");
        //See if this has been done already, check that all needed conversations are done and player level is high enough
        if(this.finished4 == false && stevie.state > 4 && vlad.state > 0 && this.player.knowledgeLevel >= 4){
            let nicoled = getNPC("NicoleD");
            nicoled.state = 4;
            //hide blocker and remove their collider
            this.examRoom.visible = false;
            this.examRoomCollider.active = false;
            this.player.scene.keyboard.E.isDown = true;
            nicoled.npcSpeak(this.player, nicoled);  
            //Move Vlad to exam room
            vlad.x = 6600;
            vlad.y = 4020;
            vlad.startX = 6600;
            vlad.startY = 4020;
            vlad.state = 4; //Fight state
            this.finished4 = true;
        } 
    },

    update: function(){
		//Play enemy animations and move them as needed
        updateSprites();  
        //See if the player can move on to the next level
        this.checkProgress1(); 
        this.checkProgress2(); 
        this.checkProgress3(); 
        this.checkProgress4();		
        //Make sure the player isnt attacking before moving him
        if(!this.player.state){
            //Set player movement on keypress
            if (this.keyboard.D.isDown === true) {
                this.player.setVelocityX(512);
            }
            if (this.keyboard.W.isDown === true) {
                this.player.setVelocityY(-512);
            }
            if (this.keyboard.S.isDown === true) {
                this.player.setVelocityY(512);
            }
            if (this.keyboard.A.isDown === true) {
                this.player.setVelocityX(-512);
            }
            if (this.keyboard.A.isUp && this.keyboard.D.isUp) { //not moving on X axis
                this.player.setVelocityX(0);      
            }
            if (this.keyboard.W.isUp && this.keyboard.S.isUp) { //not pressing y movement
                this.player.setVelocityY(0);
            }        
            //set animations for player
            if (this.player.body.velocity.x > 0) { //moving right
                this.player.play("right", true);
                this.player.isFacing = "right";
            } else if (this.player.body.velocity.x < 0) { //moving left
                this.player.play("left", true);
                this.player.isFacing = "left";
            } else if (this.player.body.velocity.y < 0) { //moving up
                this.player.play("up", true);
                this.player.isFacing = "up";
            } else if (this.player.body.velocity.y > 0) { //moving down
                this.player.play("down", true);
                this.player.isFacing = "down";
            }
        }
    },
	preload: function(){
        //Load all the levels animations through the animation manager
        setSceneAnims(this);
        setAnimations();        
        //load map assets
        this.load.image("ground1", "./assets/image/ground1.png");
        this.load.image("ground2", "./assets/image/ground2.png");
        this.load.image("ground3", "./assets/image/ground3.png");
        this.load.image("holster", "./assets/image/holster.png");
        this.load.image("fat", "./assets/sprite/fat.png");
        this.load.image("lightwood", "./assets/image/lightwood.png");
        this.load.tilemapTiledJSON("FirstLevel", "./assets/maps/FirstLevel.json");
    }
});
var PauseScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function PauseScene (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.PAUSE,
            physics: {
				default: "arcade"
			}
        });
    },	
	init: function(data){
		//Get data from FirstLevel scene to work with in this scene
		this.sc = data.scene;
		this.player = data.player;
	},
	create: function(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.PAUSED).setDepth(1);
		let resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, CST.IMAGE.RESUME).setDepth(1);
		let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.9, CST.IMAGE.MENU).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
        //make p resume game as well
        this.input.keyboard.on('keyup-P', ()=>{
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
		//make buttons interactive
		resume.setInteractive();
		resume.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = resume.x - resume.width / 2 - 50;
			hoverSprite.y = resume.y;
		})
		resume.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		resume.on("pointerup", ()=>{
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
		menu.setInteractive();
		menu.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = menu.x - menu.width / 2 - 50;
			hoverSprite.y = menu.y;
		})
		menu.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		menu.on("pointerup", ()=>{
			this.sc.sound.removeByKey(CST.AUDIO.THEME1);
			this.scene.stop(CST.SCENES.FIRSTLEVEL);
			this.scene.run(CST.SCENES.MENU);
			this.scene.stop();
		})
		//Generate password
		let pw = this.add.image(this.game.renderer.width / 2 - 200, this.game.renderer.height / 2 + 150, CST.IMAGE.PASSWORD).setDepth(1);
		let pwField = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2 + 130, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(3);
		pwField.setColor("red");
		pwField.text = generatePassword(this.sc, this.player);
	}
});
var ShopScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function ShopScene (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.SHOP,
            physics: {
				default: "arcade"
			}
        });
    },	
	create: function(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.10, CST.IMAGE.FIDDY).setDepth(1);
		let title = this.add.image(this.game.renderer.width / 2,0,CST.IMAGE.SHOP);
		title.setY(title.height/2);
        let resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.9, CST.IMAGE.EXIT).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT).setScale(0.5);
		hoverSprite.setVisible(false);
		//make dialogue box for loch ness monster
		let dialogue = this.add.image(this.game.renderer.width / 2 + 25, this.game.renderer.height * 0.4, CST.IMAGE.DIALOGUE).setDepth(1);		
		//Add player stats to screen
		this.playerMoney = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.35, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerMoney.setColor("blue");
		this.playerMoney.text = "$" +this.player.money;
		this.playerLevel = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.38, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerLevel.setColor("blue");
		this.playerLevel.text = this.player.knowledgeLevel;
		this.playerKnowledge = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.41, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerKnowledge.setColor("blue");
		this.playerKnowledge.text = this.player.knowledgeProgress+"/"+this.player.knowledgeNeeded;
		this.playerWill = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.44, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerWill.setColor("blue");
		this.playerWill.text = this.player.will+"/"+this.player.willMax;
		this.playerRep = this.add.text(this.game.renderer.width/2 - 500, this.game.renderer.height * 0.47, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(1.25);
		this.playerRep.setColor("blue");
		this.playerRep.text = this.player.rep+"/"+this.player.repMax;
		//Make dialogue for loch ness monster
		this.dialogueText = this.add.text(dialogue.x-100, dialogue.y-50, '', { fontFamily: '"Roboto Condensed"' }).setDepth(2).setScale(2);
		this.dialogueText.setColor("blue");
		this.dialogueText.text = "Welcome!\nGot tree fiddy?";
		//Make purchase buttons for upgrades
		let whipUp = this.add.image(this.game.renderer.width / 2 - 500, this.game.renderer.height * 0.7, CST.IMAGE.WHIPUPGRADE).setDepth(1);
		let ballUp = this.add.image(this.game.renderer.width / 2 - 400, this.game.renderer.height * 0.7, CST.SPRITE.BALL).setDepth(1).setScale(5);
		//Make purchase buttons for items
		let exam = this.add.image(this.game.renderer.width / 2 + 250, this.game.renderer.height * 0.7, CST.IMAGE.EXAM).setDepth(1);
		let dvd = this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.DVD).setDepth(1);
		let energy = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.ENERGY).setDepth(1);
        //make space resume game as well
        this.input.keyboard.on('keyup-SPACE', ()=>{
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})	
		//Mark items that are maxed out or upgrades that are already purchased "sold out"
		if(this.player.will == this.player.willMax){
			this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make energy button interactive and purchase energy on click for 1 dollars if player has enough
			energy.setInteractive();
			energy.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = energy.x;
				hoverSprite.y = energy.y - 100;
				dialogue.setVisible(true);
				if(this.player.money < 1){
					this.dialogueText.text = "Don't bother...\nYou can't even\nafford that.";
				}else if(this.player.will == this.player.willMax){
					this.dialogueText.text = "All out.\nYou don't need\nany anyways...";
				}else{
					this.dialogueText.text = "Cramming?\nThis will keep\nyou up!";
				}
			})
			energy.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
				this.dialogueText.text = "";
				dialogue.setVisible(false);
			})
			energy.on("pointerup", ()=>{
				if(this.player.money > 1 && this.player.will != this.player.willMax){
					this.player.money -= 1;
					this.playerMoney.text = "$" +this.player.money;
					this.player.addItem(this.player,"energy");	
					this.playerWill.text = this.player.will+"/"+this.player.willMax;
					this.dialogueText.text = "Thanks!\nNeed anything\nelse?";			
				}else if(this.player.rep != this.player.repMax){
					this.dialogueText.text = "What are you\ntrying to rob me?";
				}
				//Make button not work if maxed out
				if(this.player.will == this.player.willMax){
					energy.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					energy.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}
			})
		}
		if(this.player.rep == this.player.repMax){
			this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make  button interactive and purchased on click for 2.5 dollars if player has enough
			dvd.setInteractive();
			dvd.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = dvd.x;
				hoverSprite.y = dvd.y - 100;
				dialogue.setVisible(true);
				if(this.player.money < 2.5){
					this.dialogueText.text = "Don't bother...\nYou can't even\nafford that.";
				}else if(this.player.rep == this.player.repMax){
					this.dialogueText.text = "All out.\nYou don't need\nany anyways...";
				}else{
					this.dialogueText.text = "Want to be more\nrelevant?\nWatch this movie!";
				}
			})
			dvd.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
				this.dialogueText.text = "";
				dialogue.setVisible(false);
			})
			dvd.on("pointerup", ()=>{
				if(this.player.money > 2.5 && this.player.rep != this.player.repMax){
					this.player.money -= 2.5;
					this.playerMoney.text = "$" +this.player.money;
					this.player.addItem(this.player,"dvd");	
					this.playerRep.text = this.player.rep+"/"+this.player.repMax;
					this.dialogueText.text = "Thanks!\nNeed anything\nelse?";			
				}else if(this.player.rep != this.player.repMax){
					this.dialogueText.text = "What are you\ntrying to rob me?";
				}
				//Make button not work if maxed out
				if(this.player.rep == this.player.repMax){
					dvd.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					dvd.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}
			})
		}
		if(this.player.maxBalls > 3){
			this.add.image(this.game.renderer.width / 2 - 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make  button interactive and purchased on click for 3.5 dollars if player has enough
			ballUp.setInteractive();
			ballUp.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = ballUp.x;
				hoverSprite.y = ballUp.y - 100;				
				if(this.player.money < 7 && this.player.maxBalls == 3){
					this.dialogueText.text = "Don't bother...\nYou can't even\nafford that.";
					dialogue.setVisible(true);
				}else if(this.player.maxBalls == 3){
					this.dialogueText.text = "Add another\nPing Pong ball\nto your collection!";
					dialogue.setVisible(true);
				}
			})
			ballUp.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
				this.dialogueText.text = "";
				dialogue.setVisible(false);
			})
			ballUp.on("pointerup", ()=>{
				if(this.player.money > 7 && this.player.maxBalls != 4){
					this.player.money -= 7;
					this.playerMoney.text = "$" +this.player.money;
					this.player.maxBalls++;	
					this.player.balls++;
					this.player.displayInventory(); //Updates the ball count
					//Make button not work after purchase
					ballUp.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					ballUp.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.dialogueText.text = "Thanks!\nNeed anything\nelse?";
					this.add.image(this.game.renderer.width / 2 - 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}else if(this.player.maxBalls != 4){
					this.dialogueText.text = "What are you\ntrying to rob me?";
				}
			})
		}
		if(this.player.whipUpgrade > 0){
			this.add.image(this.game.renderer.width / 2 - 500, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
		}else{
			//Make  button interactive and purchased on click for 3.5 dollars if player has enough
			whipUp.setInteractive();
			whipUp.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = whipUp.x;
				hoverSprite.y = whipUp.y - 100;				
				if(this.player.money < 10.5 && this.player.whipUpgrade == 0){
					this.dialogueText.text = "Don't bother...\nYou can't even\nafford that.";
					dialogue.setVisible(true);
				}else if(this.player.whipUpgrade == 0){
					this.dialogueText.text = "Lose the flimsy\ncable you have.\nThis one hurts\ntwice as much!";
					dialogue.setVisible(true);
				}
			})
			whipUp.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
				this.dialogueText.text = "";
				dialogue.setVisible(false);
			})
			whipUp.on("pointerup", ()=>{
				if(this.player.money > 10.5 && this.player.whipUpgrade == 0){
					this.player.money -= 10.5;
					this.playerMoney.text = "$" +this.player.money;
					this.player.whipUpgrade++;
					this.player.displayInventory();
					//Make button not work after purchase
					whipUp.on("pointerover", ()=>{hoverSprite.setVisible(false);})
					whipUp.on("pointerup", ()=>{hoverSprite.setVisible(false);})
					hoverSprite.setVisible(false);
					this.dialogueText.text = "Remember! I did\nnot tell you to hit\npeople with this!";
					this.add.image(this.game.renderer.width / 2 - 500, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				}else if(this.player.whipUpgrade == 0){
					this.dialogueText.text = "What are you\ntrying to rob me?";
				}
			})
		}	
		//Make exam button interactive and purchase exam sheet on click for 3.5 dollars if player has enough
		exam.setInteractive();
		exam.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = exam.x;
			hoverSprite.y = exam.y - 100;
			dialogue.setVisible(true);
			if(this.player.money < 3.5){
				this.dialogueText.text = "Don't bother...\nYou can't even\nafford that.";
			}else{
				this.dialogueText.text = "Screw studying!\nFor tree fiddy\nthis will increase\nyour knowledge!";
			}			
		})
		exam.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
			this.dialogueText.text = "";
			dialogue.setVisible(false);
		})
		exam.on("pointerup", ()=>{
			if(this.player.money >= 3.5){
				this.player.money -= 3.5;
				this.playerMoney.text = "$" +this.player.money;
				this.player.addItem(this.player,"examsheet");	
				this.playerRep.text = this.player.rep+"/"+this.player.repMax;
				this.playerWill.text = this.player.will+"/"+this.player.willMax;
				this.playerKnowledge.text = this.player.knowledgeProgress+"/"+this.player.knowledgeNeeded;
				this.playerLevel.text = this.player.knowledgeLevel;	
				this.dialogueText.text = "Thanks!\nNeed anything\nelse?";		
			}else{
				this.dialogueText.text = "What are you\ntrying to rob me?";
			}
			//This makes other two items unavailable if level up occurs maxing them out
			if(this.player.rep == this.player.repMax && this.player.will == this.player.willMax){
				dvd.on("pointerover", ()=>{hoverSprite.setVisible(false);})
				dvd.on("pointerup", ()=>{hoverSprite.setVisible(false);})
				hoverSprite.setVisible(false);
				this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
				energy.on("pointerover", ()=>{hoverSprite.setVisible(false);})
				energy.on("pointerup", ()=>{hoverSprite.setVisible(false);})
				hoverSprite.setVisible(false);
				this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, CST.IMAGE.SOLDOUT).setDepth(1).setScale(.25);
			}
		})		
		//make resume button interactive and exit game on click
		resume.setInteractive();
		resume.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.setScale(1);
			hoverSprite.play("walk");
			hoverSprite.x = resume.x - resume.width / 2 - 50;
			hoverSprite.y = resume.y;
		})
		resume.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
			hoverSprite.setScale(0.5);
		})
		resume.on("pointerup", ()=>{
            this.scene.resume(CST.SCENES.FIRSTLEVEL);
            this.scene.stop();
		})
	},

	init: function(data){
		//Get data from FirstLevel scene to work with in this scene
		this.player = data;
	}
});
var TalkScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function TalkScene (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.TALK,
            physics: {
				default: "arcade"
			}
        });
    },	
	init: function(data){
		//Get data from FirstLevel scene to work with in this scene
		this.npc = data.npc;
		this.player = data.player;
	},
	create: function(){
		//Handle input for dialogue
		this.chatsDone = 0; //The number of sections finished so far
		this.selectDialogue(this.player, this.npc);
		//add in assets
        let contin = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.75 , CST.IMAGE.CONTINUE).setDepth(1);
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		hoverSprite.setVisible(false);
        //make space resume game as well
        this.input.keyboard.on('keyup-R', ()=>{
			this.acceptInput();
		})
		//make e exit conversation as well
        this.input.keyboard.on('keyup-C', ()=>{
			//go through all inputs
			while(this.chatsDone < this.chats.length){
				this.acceptInput();
			}
			this.acceptInput();//get the last input
		})
		//make buttons interactive
		contin.setInteractive();
		contin.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = contin.x - contin.width / 2 - 50;
			hoverSprite.y = contin.y;
		})
		contin.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		contin.on("pointerup", ()=>{
			this.acceptInput();
		})
	},
	//This takes the item of a given name and frame and creates a sprite for it at the x,y coordinates given
	dropItem: function(frame, x, y, name){
		let sprite = new Sprite(this.player.scene, this.player.x + x, this.player.y + y, CST.SPRITE.ITEM, 0, 0, frame, 0, name);
		itemSet.add(sprite);
		sprite.setSize(32,32);
		sprite.body.setOffset(0,0);
	},
	//This adds the text from a dialogue to the dialogue cmd prompt
	addCMD2Text: function(text, player){
		//If the command prompt has more than 34 lines, delete the first one before adding another
        if(text.split(/\r\n|\r|\n/).length + player.scene.cmd2Lines >= 35){
			//Increment the number of lines tracker for each line of dialogue in the string
			for(var i = 0; i <  text.split(/\r\n|\r|\n/).length; i++){
				player.scene.cmd2Text.text = player.scene.cmd2Text.text.replace(/[\w\W]+?\n+?/,"");
			}
        }else{
            //Still room so don't remove anything, just increase counter for lines
            player.scene.cmd2Lines += text.split(/\r\n|\r|\n/).length;
        }
		player.scene.cmd2Text.text += text+"\n";
	},	
	//This makes the scene wait for player input before continuing with more dialogue or exiting
	acceptInput: function(){		
		if(this.chatsDone >= this.chats.length){
			//Return to game, no more dialogue now
			this.scene.resume(CST.SCENES.FIRSTLEVEL);
			this.scene.stop();
		}else{
			//Add next dialogue to cmd2
			this.addCMD2Text(this.chats[this.chatsDone], this.player);
			this.chatsDone++;			
		}		
	},
	//This is the giant dialogue switch. It determines and updates what should be the next dialogue from characters depending on their current states
	selectDialogue: function(player, npc){
		//Append new text to chats array based on npc name for acceptInputs function to print
        switch(npc.name){
			case "skinny":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Skinny_Sister/Let me in.", 
					"C:/Users/Skinny_Sister/To_Player/No way.\nChads all mine."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Skinny_Sister/I'm not gonna\ntake him from you.", 
					"C:/Users/Skinny_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/Skinny_Sister/To_Player/Stop trying\nnobodies getting in here."];
				break;
			}
			break;
			case "medium":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Medium_Sister/Let me in.", 
					"C:/Users/Skinny_Sister/To_Player/No way.\nWe gotta go on a date before I'll let you through!"];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Medium_Sister/I'm not gonna\ndate you, you're erm... not my type.", 
					"C:/Users/Medium_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/Medium_Sister/To_Player/Just date me\nor you're not getting in here."];
				break;
			}
			break;
			case "large":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Large_Sister/Let me in.", 
					"C:/Users/Skinny_Sister/To_Player/No way.\nThis room is awful."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Large_Sister/I'm don't care\njust let me in.", 
					"C:/Users/Large_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/Large_Sister/To_Player/Stop trying\nI won't let you see this."];
				break;
			}
			break;
			case "extralarge":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_ExtraLarge_Sister/Let me in.", 
					"C:/Users/ExtraLarge_Sister/To_Player/No way.\nThe food is all mine."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_ExtraLarge_Sister/I'm not gonna\ntake it from you.", 
					"C:/Users/ExtraLarge_Sister/To_Player/That's what\neveryone says."];
					npc.state++;
				break;
				case 2:
					this.chats = [ 
					"C:/Users/ExtraLarge_Sister/To_Player/Stop trying\nnobodies eating this food except me."];
				break;
			}
			break;
			case "Nicole":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Self/Hey is that Nicole?", 
					"C:/Users/Nicole/To_Player/Hey! Thought I'd see\nyou here. First day of programming school eh?",
					"C:/Users/Player/To_Nicole/Yep, you're here for\nthat too right?",
					"C:/Users/Nicole/To_Player/Sure am! I'm so happy\nwe met up. Things are a bit weird here...",
					"C:/Users/Player/To_Nicole/Really? It can't be too\nbad its just University.",
					"C:/Users/Nicole/To_Player/Maybe it's just me but\nthose nerds running around are just gross.",
					"C:/Users/Player/To_Nicole/Sheesh, I get nerds are\nlame but I wouldn't go that far...",
					"C:/Users/Nicole/To_Player/No they are! These nerds\nmust not shower cause I smell them a mile a way.\nIt doesn't help they're always running through\nthe halls! One accidently touched me and I\nnearly threw up, he was that greasy!",
					"C:/Users/Player/To_Nicole/Damn, sounds like they're\nplaying too much smash.",
					"C:/Users/Nicole/To_Player/Huh? Oh and don't touch\nthe dorky girls!",
					"C:/Users/Player/To_Nicole/Wasn't planning on it.",
					"C:/Users/Nicole/To_Player/No seriously. I bumped\ninto one and got rushed by like 10 nerds. Apparently\nthey thought I was hitting on her. I'm not even\nattracted to girls!",
					"C:/Users/Player/To_Nicole/HaHa that's too funny.\nMust be quite the territorial geeks here.",
					"C:/Users/Nicole/To_Player/You're telling me. Come\non now. Let's get to class, I'll follow you.",];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Nicole/Know where to go?", 
					"C:/Users/Nicole/To_Player/Yeah, the blue room."];
				break;
				case 2:
					this.chats = [
						"C:/Users/Nicole/To_Player/That's enough music.\nI think we're ready to go to cooking class.",
						"C:/Users/Player/To_Nicole/Yeah, I'm hungry."];
				break;
				case 3:
					this.chats = [
						"C:/Users/Nicole/To_Player/That's enough cooking.\nI think we're ready to take our exams now.",
						"C:/Users/Player/To_Nicole/I agree."];
				break;
				case 4:
					this.chats = [
						"C:/Users/Nicole/To_Player/Good job! Now we can\ntake our exams and be done with this semester.",
						"C:/Users/Player/To_Nicole/Yeah, what a relief.\nGuess I'm gonna skip Chads party after this debacle.",
						"C:/Users/Nicole/To_Player/Yeah, I can't go either.\nI'll be stuck in class until it's almost over.",
						"C:/Users/Player/To_Nicole/Oh well, guess we'll\nhave to have our own party next year!",
						"C:/Users/Nicole/To_Player/Haha, yeah I'll be\nlooking forward to it!"];
					npc.state++;
				break;
				case 10:
					//Unlock all rooms got mask
					this.chats = [
					"C:/Users/Nicole/To_Player/Wow I think this will\nget rid of the girls blocking your way!",
					"C:/Users/Player/To_Self/Huh, neat. Girls will let\nme go anywhere with the Chad mask."];
					//See what state to reset to
					if(npc.scene.finished2){
						npc.state = 3;
					}else if(npc.scene.finished1){
						npc.state = 2;
					}else{
						npc.state = 1;
					}
				break;
			}				
            break;
            case "NicoleD":				
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/oliceN/To_Player/Hwy$ddi%sith(paphen?",
					"C:/Users/Player/To_Self/I can't believe Chad killed\nNicole."];
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/oliceN/To_Player/mI'[os*rosry.",
					"C:/Users/Player/To_Self/I wish Nicole never had\nthose late classes so she'd still be here..."];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/oliceN/To_Player/eAr^uyo+neistling?",
					"C:/Users/Player/To_Self/I miss Nicole."];
					npc.state = 0; //restart
				break;
				case 3:
					this.chats = [
					"C:/Users/oliceN/To_Player/lasePe$leph%em!",
					"C:/Users/Player/To_Self/I should go to the study room.\nNasty brown, who would colour something that?"];
					npc.state = 0; //restart
				break;
				case 4:
					this.chats = [
					"C:/Users/oliceN/To_Player/odoG#uckl%no@oruy\nxeam!",
					"C:/Users/Player/To_Self/Time for my last exam."];
				break;
				case 5:
					this.chats = [
					"C:/Users/oliceN/To_Player/m'I#os rodpu^!$oYu\nta$eslat)amde$ti...",
					"C:/Users/Player/To_Self/Guess I should leave now...\nShould probably talk to Claire first though, wonder\nif she's still mad."];
				break;
				case 10:
					//Unlock all rooms get mask
					this.chats = [
					"C:/Users/oliceN/To_Player/oWw,$I%hinkt#hatt$iwll\netg$dir#fo%het#rilgs#lbcokngi@uory#ayw!",
					"C:/Users/Player/To_Self/Huh, neat. Girls will let\nme go anywhere with the Chad mask."];
					//See what state to reset to
					if(npc.scene.finished4){
						npc.state = 4;
					}else if(npc.scene.finished3){
						npc.state = 3;
					}
				break;
			}
            break;
            case "Claire1":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Claire/You look like you know\n your way around here, what's your name?", 
					"C:/Users/Claire/To_Player/The name's Claire and I\nsure do! What are you doing here?",
					"C:/Users/Player/To_Claire/Introducing myself, I\nalways liked it when a friend cooks.",
					"C:/Users/Claire/To_Player/Well I guess we'll get\nalong great then! Oh by the way, I have exam answers\nfrom last year on this sheet. You can have it. It'll\nimprove your knowledge. *WINKS*",];
					npc.state++;
					this.dropItem(1, 0, -50, "examsheet");
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Claire/Is that food free?", 
					"C:/Users/Claire/To_Player/Nothing in life is free. I\nmight sneak some out to Chads partylater, so you\ncan have some then if you go.",
					"C:/Users/Player/To_Claire/Guess I'll have to go, see\nya there."];
					npc.state++;
				break;
				case 2:
					this.chats = ["C:/Users/Claire/To_Player/Sorry I can't talk anymore\nor this food won't be ready in time for Chads party."];
					npc.state++;
					break;						
				case 3:
					this.chats = ["C:/Users/Claire/To_Player/*IGNORES YOU*"];
					break;
			}
            break;
            case "Claire2":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Self/Wow Claire changed clothes.", 
					"C:/Users/Claire/To_Player/Have you seen Brad?",
					"C:/Users/Player/To_Claire/Wow, nice to see you too.",
					"C:/Users/Claire/To_Player/I don't have time for\ngames. Have you seen him or not?",
					"C:/Users/Player/To_Claire/Actually we just fought.",
					"C:/Users/Claire/To_Player/No way you don't even\nlook hurt! And there's no way you would beat him\nin a fight!",
					"C:/Users/Player/To_Claire/Well I did. Broke that\nlosers nose right at the school entrance.",
					"C:/Users/Claire/To_Player/YOU JERK. You better\nnot have ruined his face! I'm going to see him.",
					"C:/Users/Player/To_Self/I guess it isn't only her\nclothes she changed..."];
					npc.startX = 1250;
					npc.startY = 4100;
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Self/Here it comes.", 
					"C:/Users/Claire/To_Player/You are so immature!\nWhy would you hurt Brad?",
					"C:/Users/Player/To_Claire/Someone had to put him\nin his place. He may try to act like him but he'll\nnever be a great guy like Chad.",
					"C:/Users/Claire/To_Player/Chad killed Nicole. Are\nyou forgetting that?",
					"C:/Users/Player/To_Claire/I forgive him for making\na mistake. I can't forgive Brad intentionally trying\nto hurt my feelings like he did.",
					"C:/Users/Claire/To_Player/You think that justifies\nfighting him? A fight won't bring your dead friend\nback!",
					"C:/Users/Player/To_Claire/Well...",
					"C:/Users/Claire/To_Player/I don't want to hear it. I'm\nnever talking to you again!",
					"C:/Users/Player/To_Claire/Whatever..."];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Claire/Really gonna be like this?",
					"C:/Users/Claire/To_Player/*IGNORES YOU*", 
					"C:/Users/Claire/To_Self/Why won't he leave?"];
					npc.state++;
				break;
				case 3:
					this.chats = [ 
					"C:/Users/Claire/To_Player/Go away."];
					npc.state++;
				break;
				case 4:
					this.chats = [ 
					"C:/Users/Claire/To_Player/I hate you."];
					npc.state = 2;
				break;
				case 5:
					this.chats = [ 
					"C:/Users/Player/To_Self/I wonder if Claire is still\nmad at me.", 
					"C:/Users/Claire/To_Player/Hey! How are you doing?\nJust finished school?",
					"C:/Users/Player/To_Claire/Yeah, it's been interesting\nto say the least.",
					"C:/Users/Claire/To_Player/Lucky, I'm going to have\nto take another year because of all the time I wasted\nat parties with Brad.",
					"C:/Users/Player/To_Claire/Well that's too bad...",
					"C:/Users/Claire/To_Player/Yeah... Hey, look. I'm\nsorry about before. You were right. Brad is a jerk.\nI'm glad you put him in his place.",
					"C:/Users/Player/To_Claire/Wow really? I thought\nyou two were going strong together.",
					"C:/Users/Claire/To_Player/Oh no. Seeing him like\nthat after you... well... it made me rethink just how\ncool he really was.",
					"C:/Users/Player/To_Claire/Glad you came to your\nsenses.",
					"C:/Users/Claire/To_Player/Me too, thanks for that\nwake up call. Say you want to go get something to eat\nlater?",
					"C:/Users/Player/To_Claire/Well... sure why not.",
					"C:/Users/oliceN/To_Player/odGo^eyb.",
					"C:/Users/Player/To_Self/What else am I gonna do?"];
					npc.state = 6;
				break;
				case 7:
					this.chats = [ 
					"C:/Users/Claire/To_Player/Hey.",
					"C:/Users/Player/To_Claire/Oh, hi there.",
					"C:/Users/Claire/To_Player/I like your mask here's\na bunch of exam sheets."];
					this.dropItem(1, 0, 50, "examsheet");
					this.dropItem(1, 0, -50, "examsheet");
					this.dropItem(1, 50, 0, "examsheet");
					this.dropItem(1, -50, 0, "examsheet");
				break;
			}
            break;
            case "Kyle":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Nicole/To_Player/Ugh, these mouth\nbreathers are really annoying to listen to. All they\never talk about is JSON.",
					"C:/Users/Player/To_Nicole/Yep, they're pretty\nannoying, I feel lame just being around them.",
					"C:/Users/Nicole/To_Player/Can we leave then?",
					"C:/Users/Player/To_Nicole/No wait this guy seems\nnormal.",
					"C:/Users/Player/To_Kyle/How's the weather down\nthere?", 
					"C:/Users/Kyle/To_Player/Amazing! I'm so pumped to\nbe here!",
					"C:/Users/Player/To_Kyle/Good, someone who isn't\neasily offended.",
					"C:/Users/Kyle/To_Player/Me? Never! Chicks don't\nlike insecure dudes.",
					"C:/Users/Player/To_Kyle/You're a ladies man then?", 
					"C:/Users/Kyle/To_Player/Yeah, know any girls that I\nshould?",
					"C:/Users/Nicole/To_Player/Awe he would be so cute\nwith Stevie!",
					"C:/Users/Player/To_Kyle/Yeah, you should try with\nStevie. As long as you don't mind short people haha.",
					"C:/Users/Kyle/To_Player/Ha, perfect I love em short.\nThanks pal. You want the rest of this energy drink?",
					"C:/Users/Player/To_Kyle/Sure *Grabs drink* Why is\nit still full?", 
					"C:/Users/Kyle/To_Player/People my size don't need\nmuch of that. Enjoy the drink, I'll see you around."];
					this.dropItem(3, 0, -50, "energy");
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Kyle/You ask out Stevie yet?", 
					"C:/Users/Kyle/To_Player/Not yet. Need to think of\nan opener.",
					"C:/Users/Player/To_Kyle/I'll leave you to it."];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Kyle/To_Player/Can't talk, I'm scouting for\ngirls."];
					npc.state++;
					break;						
				case 3:
					this.chats = [
					"C:/Users/Kyle/To_Player/How's this opener:\nWant to see my... No never mind it sucks.",
					"C:/Users/Player/To_Kyle/You'll get it. Keep trying."];
					npc.state=2;
					break;
				case 4:
					this.chats = [
					"C:/Users/Kyle/To_Player/Hey...",
					"C:/Users/Player/To_Kyle/You okay. How's Stevie.",
					"C:/Users/Kyle/To_Player/...great now that she met\nBrad.",
					"C:/Users/Player/To_Kyle/I don't think he's into her.\nBesides I just beat him up.",
					"C:/Users/Kyle/To_Player/That's the first good thing\nI've heard in months. Take this exam sheet."];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
					break;
				case 5:
					this.chats = [
					"C:/Users/Kyle/To_Player/Sorry I'd rather not talk\nright now, kinda bummed out.",
					"C:/Users/Player/To_Kyle/Take care of yourself, man."];
					break;
			}
            break;
            case "chad":
			switch(npc.state){
				case 0:
				this.chats = [
					"C:/Users/Player/To_Chad/Hey, I hear you're throwing\na party..", 
					"C:/Users/Chad/To_Player/Duh, I'm Chad! I throw\nthe sickest parties man! So sick, everyone's invited!",
					"C:/Users/Player/To_Chad/Awesome man I can't wait\nto go!", 
					"C:/Users/Player/To_Nicole/Are you gonna go?",
					"C:/Users/Nicole/To_Player/Sorry but I'm gonna be\nstuck late here during my summer courses.", 
					"C:/Users/Chad/To_Nicole/You're gonna miss out! My\nparties are the best in the country. Drive to my place\nand crash with me if you want, no pressure.",
					"C:/Users/Nicole/To_Chad/Thanks for the offer but I\nprobably won't even be finished class by the time the\nparties over.", 
					"C:/Users/Chad/To_Nicole/Well the offers there if you\nchange your mind.",
					"C:/Users/Chad/To_Player/Hey, before you go I got\nsome exam sheets you can have.",
					"C:/Users/Player/To_Chad/Thanks, you're the best!."];
					this.dropItem(1, 0, -50, "examsheet");
				npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Chad/Got a spare bed I could\ncrash on for the party?", 
					"C:/Users/Chad/To_Player/Sure do!",
					"C:/Users/Player/To_Chad/Thanks Chad!"];
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Chad/Who's going to the party?", 
					"C:/Users/Chad/To_Player/Chicks, dudes, everyone!"];
					npc.state++;
					break;						
				case 3:
					this.chats = [ 
					"C:/Users/Chad/To_Player/Not now bro. I'm busy\nsetting up."];
					break;
				case 4:
					this.chats = [ 
					"C:/Users/Chad/To_Player/Bro you're gonna love this\nchick I just met. She's perfect for you.",
					"C:/Users/Player/To_Chad/Can this wait? I got to go\nto my exam.",
					"C:/Users/Chad/To_Player/No way you can't miss out\non this chick man! I won't let you.",
					"C:/Users/Player/To_Chad/Sorry but I'm going to go\nto my exam.",
					"C:/Users/Chad/To_Player/Just try to resist me!",
					"C:/Users/Nicole/To_Player/Oh my god don't look!\nThat's some HOT STUFF!!!"];
					//Put Chad into fighting mode
					npc.state = 7;
					break;
			}
            break;
            case "Brad":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Brad/Hey are you going to\nChads party?", 
					"C:/Users/Brad/To_Player/Of course! Everyones\ngoing to that! Chad's the coolest!",
					"C:/Users/Player/To_Brad/Cool man, I'll see you\nthere then.", 
					"C:/Users/Brad/To_Player/Oh could you get some\nbooze?",
					"C:/Users/Player/To_Brad/I would but I'm broke.", 
					"C:/Users/Brad/To_Player/Here take this cash then."];
					npc.state++;
					this.dropItem(2, 0, -50, "money");
					break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Brad/Hey.", 
					"C:/Users/Brad/To_Player/Can't talk dude, busy\nmirin Chads instagram."];
					break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Brad/Hey man long time no see.", 
					"C:/Users/Brad/To_Player/Yeah dude. Been a bummer\nsince Chad isn't here anymore.",
					"C:/Users/Player/To_Brad/He didn't graduate,\nwhere'd he go?", 
					"C:/Users/Brad/To_Player/Got locked up, it's\nridiculous. We ran out of booze at the party since\nChad did a world record keg stand it was sick!\nThen he wasn't gonna let the party dry up on his\nwatch so he drove to the store to get more.",
					"C:/Users/Player/To_Brad/He was caught drunk\ndriving?", 
					"C:/Users/Brad/To_Player/Not just that, your friend\nthere... whats her name... Nicole. She must not have\nbeen watching out cause he hit her when he left\nthe dorm and she died.",
					"C:/Users/Player/To_Brad/Oh my god... no. You're\nmessing with me, right?", 
					"C:/Users/Brad/To_Player/I know it's terrible bro.\nNo more partying with Chad.",
					"C:/Users/Player/To_Brad/Shutup, I mean Nicole.\nShe's really dead?", 
					"C:/Users/Brad/To_Player/Yeah but who cares! It's\nher fault Chad got locked up! Say have you heard\nof JSON... JSON..."];
					npc.state++;
					break;						
			}
            break;
            case "Vlad":
			switch(npc.state){
				case 0:
				this.chats = [
					"C:/Users/Player/To_Vlad/Hey.", 
					"C:/Users/Vlad/To_Player/You can see me! Most\npeople who can see me just stare.",
					"C:/Users/Player/To_Vlad/...",
					"C:/Users/Vlad/To_Player/Oh, okay. Here's some\nanswers to the exams. I'll just fail anyway."];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
				break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Vlad/Got anymore answer sheets?", 
					"C:/Users/Vlad/To_Player/Sure do!",
					"C:/Users/Player/To_Vlad/Thanks Vlad. I cancount\non you for these sheets.",
					"C:/Users/Vlad/To_Player/It's the only thing anyone\ncan count on me for.",];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
				break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Vlad/Can I have another sheet?", 
					"C:/Users/Vlad/To_Player/This is my last one.\nGOD why didn't I print more! I'm so pathetic!",
					"C:/Users/Player/To_Vlad/Uhh, okay."];
					this.dropItem(1, 0, -50, "examsheet");
					npc.state++;
					break;						
				case 3:
					this.chats = [ 
					"C:/Users/Vlad/To_Player/Not now man. I'm busy\nwallowing in self pity."];
					break;
				case 4:
					this.chats = [ 
					"C:/Users/Vlad/To_Player/I'm so sorry, I ran out of\nthose exam sheets. You must hate me now.",
					"C:/Users/Player/To_Vlad/Can this wait? I got to go\nto my exam.",
					"C:/Users/Vlad/To_Player/Oh god! Now I'm making\nyou late for your exam. You must really hate me!",
					"C:/Users/Player/To_Vlad/Are you crying?",
					"C:/Users/Vlad/To_Player/YES! *He won't move*",
					"C:/Users/oliceN/To_Player/I*nact')ese#mhi!\nsHes'%os^tahpteci!'"];
					//Put Vlad into fighting mode
					npc.state = 7;
					break;
			}
            break
            case "Stevie":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Stevie/Hey there, Mrs Short.", 
					"C:/Users/Stevie/To_Player/Hey I may be energetic\nbut I ain't no StarBucks coffee!",
					"C:/Users/Nicole/To_Stevie/You're looking great\nStevie! How are you doing?", 
					"C:/Users/Stevie/To_Player/She this nice to you?",
					"C:/Users/Player/To_Stevie/Nah I think she's hitting\non you...", 
					"C:/Users/Nicole/To_Stevie/You two... always\nscrewing around.",
					"C:/Users/Player/To_Nicole/Don't worry, I'll let you\nhit on me later. Now though, Stevie needs to hit\non Kyle.", 
					"C:/Users/Stevie/To_Player/Who's Kyle?",
					"C:/Users/Player/To_Stevie/This guy we met that you\nshould hit on. He said he'll hit on you though, so\nfeel free to just wait.", 
					"C:/Users/Stevie/To_Player/Yeah, I'll just nap. Well\nthis energy drinks no use then. Here take it.",
					"C:/Users/Nicole/To_Stevie/Aw you're both so similar,\n enjoy the nap."];
					this.dropItem(3, 0, -50, "energy");
					npc.state++;
					break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Stevie/I thought you were gonna\nnap?", 
					"C:/Users/Stevie/To_Player/Yeah I'm trying this type\nof nap where you're standing.",
					"C:/Users/Nicole/To_Stevie/Sounds pretty hard.", 
					"C:/Users/Stevie/To_Player/It is when people are\ntalking to you."];
					npc.state++;
					break;
				case 2:
					this.chats = [ 
					"C:/Users/Stevie/To_Player/ZZZZzzzZZZzzz"];
					npc.state++;
					break;						
				case 3:
					this.chats = [
					"C:/Users/Player/To_Stevie/Wake up!", 
					"C:/Users/Stevie/To_Player/Huh? why? Is that kyle\nguy here yet?",
					"C:/Users/Player/To_Stevie/Nah just bugging ya.", 
					"C:/Users/Stevie/To_Player/Oh...ZZZzzzZZZzzz"];
					npc.state=2;
					break;
				case 4:
					this.chats = [ 
					"C:/Users/Player/To_Stevie/Sup short stuff?", 
					"C:/Users/Stevie/To_Player/Don't talk to me, I heard\nyou hurt Brad!",
					"C:/Users/Player/To_Stevie/What do you care?", 
					"C:/Users/Stevie/To_Player/We're basically dating.",
					"C:/Users/Player/To_Stevie/Pretty sure he's dating\nClaire, hate to break it to you.", 
					"C:/Users/Stevie/To_Player/Ugh, just shutup will you?\nYou jerk!"];
					npc.state++;
					break;						
				case 5:
					this.chats = [
						"C:/Users/Stevie/To_Player/Buzz off, Brad hater!"];
					break;
			}
			break;
			case "Prof":
			switch(npc.state){
				case 0:
					this.chats = [
					"C:/Users/Player/To_Prof/Hey why do I need to take\nmusic?", 
					"C:/Users/Prof/To_Player/Don't ask questions!",
					"C:/Users/Player/To_Prof/Wait what?", 
					"C:/Users/Prof/To_Player/Look I'll give you the exam\nanswers, just go away!",
					"C:/Users/Player/To_Nicole/Is she for real?", 
					"C:/Users/Nicole/To_Player/Shutup don't blow this!"];
					this.dropItem(1, 0, 200, "examsheet");
					npc.state++;
					break;
				case 1:
					this.chats = [
					"C:/Users/Player/To_Prof/Look we never met and I\ndon't know you, now scram!", 
					"C:/Users/Prof/To_Player/Sheesh, fine."];
					npc.state++;
					break;
				case 2:
					this.chats = [
					"C:/Users/Player/To_Prof/Hey.",
					"C:/Users/Prof/To_Player/Who are you?"];
					break;						
			}
			break;
		}
		//Print first segment of speech
		this.acceptInput();
	}
});
var LoseScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function LoseScene (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.LOSE,
            physics: {
				default: "arcade"
			}
        });
    },	
	create: function(){
		let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
		//Make death animation for player
		let deathSprite = this.add.sprite(100,100,CST.SPRITE.PLAYER);
		deathSprite.x = this.game.renderer.width / 2;
		deathSprite.y = this.game.renderer.height / 2;
		deathSprite.setScale(2);
		deathSprite.play("die");
		hoverSprite.setVisible(false);
		//Check if this is game over or just a lost life
		if(this.data.player.lives <= 0){
			//add in assets for losing the game
			this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.DROPPED).setDepth(1);
			let restart = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, CST.IMAGE.RESTART).setDepth(1);
			let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, CST.IMAGE.MENU).setDepth(1);
			
			//make restart button interactive
			restart.setInteractive();
			restart.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = restart.x - restart.width / 2 - 50;
				hoverSprite.y = restart.y;
			})
			restart.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			restart.on("pointerup", ()=>{
				this.data.scene.restart();
				this.scene.stop();
			})
			//Make menu button interactive
			menu.setInteractive();
			menu.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = menu.x - menu.width / 2 - 50;
				hoverSprite.y = menu.y;
			})
			menu.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			menu.on("pointerup", ()=>{
				this.scene.stop(CST.SCENES.FIRSTLEVEL);
				this.scene.run(CST.SCENES.MENU);
				this.scene.stop();
			})
		}else{
			//add in assets for losing a life
			this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.DECREASE).setDepth(1);
			let contin = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.6, CST.IMAGE.CONTINUE).setDepth(1);
			let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, CST.IMAGE.MENU).setDepth(1);
			
			//make contin button interactive
			contin.setInteractive();
			contin.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = contin.x - contin.width / 2 - 50;
				hoverSprite.y = contin.y;
			})
			contin.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			contin.on("pointerup", ()=>{
				//Move player to start position
				this.data.player.x = 700;
				this.data.player.y = 4100;
				//Make player visible again
				this.data.player.visible = true;
				//Reset reputation points
				this.data.player.rep = this.data.player.repMax;
				//Refresh the console to display new rep
				this.data.player.displayInventory();
				//Reset all input
				this.data.player.scene.keyboard.E.reset();
				this.data.player.scene.keyboard.W.reset();
				this.data.player.scene.keyboard.A.reset();
				this.data.player.scene.keyboard.S.reset();
				this.data.player.scene.keyboard.D.reset();				
				//Resume sound
				this.data.sound.play(CST.AUDIO.THEME1, {
					volume: 0.25,
					loop: true
				})
				this.data.scene.resume(); //Resume the game
				this.scene.stop();
			})
			//Make menu button interactive
			menu.setInteractive();
			menu.on("pointerover", ()=>{
				hoverSprite.setVisible(true);
				hoverSprite.play("walk");
				hoverSprite.x = menu.x - menu.width / 2 - 50;
				hoverSprite.y = menu.y;
			})
			menu.on("pointerout", ()=>{
				hoverSprite.setVisible(false);
			})
			menu.on("pointerup", ()=>{
				this.scene.stop(CST.SCENES.FIRSTLEVEL);
				this.scene.run(CST.SCENES.MENU);
				this.scene.stop();
			})
		}
    },    
    init: function(data){
		//Get data from Level scene to work with in this scene
		this.data = data;
	}
});
var WinScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function WinScene (){
        Phaser.Scene.call(this, {
            key: CST.SCENES.WIN,
            physics: {
				default: "arcade"
			}
        });
    },	
	create: function(){
		//add in assets
		this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.GRADUATED).setDepth(1);
        let restart = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, CST.IMAGE.RESTART).setDepth(1);
        let menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, CST.IMAGE.MENU).setDepth(1);
        let hoverSprite = this.add.sprite(100,100,CST.SPRITE.FAT);
        //Make death animation for player
        let winSprite = this.add.sprite(100,100,CST.SPRITE.PLAYER);
        winSprite.x = this.game.renderer.width / 2;
        winSprite.y = this.game.renderer.height / 2;
        winSprite.setScale(2);
        winSprite.play("win");
		hoverSprite.setVisible(false);
		//make restart button interactive
		restart.setInteractive();
		restart.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = restart.x - restart.width / 2 - 50;
			hoverSprite.y = restart.y;
		})
		restart.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		restart.on("pointerup", ()=>{
            this.data.scene.stop();
			let password = null;
			this.scene.start(CST.SCENES.FIRSTLEVEL, {password});
            this.scene.stop();
        })
        //Make menu button interactive
        menu.setInteractive();
		menu.on("pointerover", ()=>{
			hoverSprite.setVisible(true);
			hoverSprite.play("walk");
			hoverSprite.x = menu.x - menu.width / 2 - 50;
			hoverSprite.y = menu.y;
		})
		menu.on("pointerout", ()=>{
			hoverSprite.setVisible(false);
		})
		menu.on("pointerup", ()=>{
            this.scene.stop(CST.SCENES.FIRSTLEVEL);
            this.scene.run(CST.SCENES.MENU);
            this.scene.stop();
		})
    },
    init: function(data){
		//Get data from Level scene to work with in this scene
		this.data = data;
	}
});
let game = new Phaser.Game({
	width: 1600,
	height: 675,
	parent: 'my-canvas',
	scene:[
		MenuScene, FirstLevel, PauseScene, ShopScene, TalkScene, LoseScene, WinScene
	],
	render:{
		pixelArt: true
	},
	physics: {
        default: "arcade"
	},
	scale:{
		mode: Phaser.Scale.FIT
	}
});
PracticeGame.GrandFinaleState = function(game) {
    this.bullet = null
        // this.gun = null
    this.policeman = null
    this.robber = null
        //this.game = game
    this.shotCounter = 0
    this.round
    this.surveyCount = 1
    this.prisonCell
    this.newgameButton

};

PracticeGame.GrandFinaleState.prototype = Object.create(PracticeGameBaseState.prototype)

// PracticeGame.GrandFinaleState.prototype.init = function(round,newSurvey){
    
//     this.shotCounter = 0
//     this.round = round
//     if(newSurvey){
//         this.surveyCount++
//     }
// }

PracticeGame.GrandFinaleState.prototype.preload = function() {
    //	this.load.image('wall', 'assets/wall.jpg');
    this.load.image('wall', 'assets/sky1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('robber', 'assets/robber_animation5.png', 35.5, 48);
    this.load.spritesheet('policeman', 'assets/policeman_animation_shooting.png', 34, 68);
	this.load.spritesheet('prison_cell', 'assets/prison-cell.png', 210, 150);
    this.load.spritesheet('newgame_button', 'assets/newgame_button_sheet.png', 127, 30);
    
}


PracticeGame.GrandFinaleState.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.wall = this.add.sprite(0, 0, 'wall');



    this.policeman = this.add.sprite(100, this.world.height - 90, 'policeman')

    this.game.physics.arcade.enable(this.policeman);

    this.policeman.body.velocity.y = -150
    this.policeman.anchor.setTo(0, 0);
    


    this.policeman.animations.add('right', [0, 1, 2], 15, true);
    this.policeman.animations.add('left', [4, 5, 6], 15, true);
    this.policeman.animations.add('stop', [3], 15, false);

    this.robber = this.add.sprite(this.world.width / 2,this.world.height - 50, 'robber')
    this.game.physics.arcade.enable(this.robber);
    this.robber.enableBody = true
    this.robber.body.collideWorldBounds = true;
    // this.robber.body.onWorldBounds = new Phaser.Signal();
    this.robber.body.bounce.x = 1
    this.robber.body.velocity.x = -150
    
    
    this.robber.animations.add('right', [0, 1, 2], 15, true);
    this.robber.animations.add('left', [4, 5, 6], 15, true);
    this.robber.animations.add('stop', [3], 15, false);
    this.robber.animations.add('dead', [7], 15, false);


	this.prisonCell = this.game.add.sprite(this.world.width/2-75,this.world.height-152, 'prison_cell');
	 this.game.physics.arcade.enable(this.prisonCell);
	 this.prisonCell.enableBody = true;
	 
	 this.robber.position.x = this.prisonCell.position.x + 60
    
    this.newgameButton = this.add.button(this.world.width/2, 10, 'newgame_button', this.newgameButtonClick, this, 0, 0, 0, 1);
    // this.cursors = this.input.keyboard.createCursorKeys();

    // this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    



}

PracticeGame.GrandFinaleState.prototype.update = function() {

    
    if( this.robber.body.velocity.x > 0){
        this.robber.animations.play('right')
    }else if(this.robber.body.velocity.x < 0){
        this.robber.animations.play('left')
    }else if(this.robber.body.velocity.x = 0){
        this.robber.animations.play('stop')
    }
    
    if(this.robber.position.x >= 490){
        this.robber.body.velocity.x = -150 
        this.robber.animations.play('left')
    }
    
    if(this.robber.position.x <= 328 && this.robber.body.velocity.x < 0){
        this.robber.body.velocity.x = 150 
        this.robber.animations.play('right')
    }
    
    if(this.policeman.position.y <= this.world.height - 150 && this.policeman.body.velocity.y < 0){
        this.policeman.body.velocity.y = 150 
    }
    if(this.policeman.position.y >= this.world.height - 63 && this.policeman.body.velocity.y > 0){
        this.policeman.body.velocity.y = -150 
    }
}

PracticeGame.GrandFinaleState.prototype.preRender = function(){
    
}
PracticeGame.GrandFinaleState.prototype.render = function(){
    //   this.game.debug.body(this.robber);
    //   this.game.debug.spriteInfo(this.policeman,20,20);
    //   this.game.debug.body(this.weapon.bullets);
    //   this.game.debug.bodyInfo(this.weapon.bullets, 32, 32);
    //   this.game.debug.bodyInfo(this.robber, 132, 132);
    // this.game.debug.text(this.shotCounter + ' talalat ' , 2,14,'#ff0')
}

PracticeGame.GrandFinaleState.prototype.newgameButtonClick = function(){

		this.game.state.start('ShootingState',true,false,1,true);
}
// PracticeGame.GrandFinaleState.prototype.robberInTheCage = function robberInTheCage(){
    
// 	var game = this.game
// 	cop_car.alpha= 0;
// 	prisonCell = game.add.sprite(CAGE_X-75,CAGE_Y, 'prison_cell');
// 	 game.physics.arcade.enable(prisonCell);
// 	 prisonCell.enableBody = true;
// 	 robber.alpha= 1
// 	 robber.position.x = prisonCell.position.x + 60
// //	 robber.body.velocity.x = 100
// 	 statusObject.robberInTheCage = true
// 	 policeman.position.x = 60
// 	 policeman.alpha= 1
	 
// 	 policeman.position.y =game.world.height - 150  
// 	 policeman.body.bounce.set(1)

// }
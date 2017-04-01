PracticeGame.ShootingState = function(game) {
    this.bullet = null
        // this.gun = null
    this.policeman = null
    this.robber = null
        //this.game = game
    this.shotCounter = 0
    this.round
    this.surveyCount = 1

};

PracticeGame.ShootingState.prototype = Object.create(PracticeGameBaseState.prototype)

PracticeGame.ShootingState.prototype.init = function(round,newSurvey){
    
    this.shotCounter = 0
    this.round = round
    if(newSurvey){
        this.surveyCount++
    }
}

PracticeGame.ShootingState.prototype.preload = function() {
    //	this.load.image('wall', 'assets/wall.jpg');
    this.load.image('wall', 'assets/sky1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('robber', 'assets/robber_animation5.png', 35.5, 48);
    // this.load.spritesheet('robber_laying', 'assets/robber_laying.png', 48, 48);
    this.load.spritesheet('policeman', 'assets/policeman_animation_shooting.png', 34, 68);
    // this.load.spritesheet('gun', 'assets/gun.png', 24, 45);
    this.load.spritesheet('bullet', 'assets/bullet.png', 12, 16);
    
}


PracticeGame.ShootingState.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.wall = this.add.sprite(0, 0, 'wall');

    //  Creates 30 bullets, using the 'bullet' graphic
    this.weapon= this.game.add.weapon(3, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    this.weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.weapon.fireRate = 100;
    this.weapon.bullets.enableBody  = true
    this.game.physics.arcade.enable(this.weapon.bullets)
    // this.bullet.physicsBodyType = Phaser.Physics.ARCADE;

    // this.bullet.angle = 90

    this.policeman = this.add.sprite(this.world.width / 2, this.world.height - 68 * this.round, 'policeman')

    this.game.physics.arcade.enable(this.policeman);

    // this.gun.body.drag.set(70);
    this.policeman.body.maxVelocity.set(200);
    this.policeman.anchor.setTo(0, 0);
    //  this.gun.angle = -90
    this.weapon.bulletAngleOffset = 90;
    


    this.policeman.animations.add('right', [0, 1, 2], 15, true);
    this.policeman.animations.add('left', [4, 5, 6], 15, true);
    this.policeman.animations.add('stop', [3], 15, false);




    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.weapon.trackSprite(this.policeman, 27, 3, false);

    this.robber = this.add.sprite(this.world.width / 2,this.world.height - 350, 'robber')
    this.game.physics.arcade.enable(this.robber);
    this.robber.enableBody = true
    this.robber.body.collideWorldBounds = true;
    // this.robber.body.onWorldBounds = new Phaser.Signal();
    this.robber.body.bounce.x = 1
    this.robber.body.velocity.x = 150
    
    
    this.robber.animations.add('right', [0, 1, 2], 15, true);
    this.robber.animations.add('left', [4, 5, 6], 15, true);
    this.robber.animations.add('stop', [3], 15, false);
    this.robber.animations.add('dead', [7], 15, false);

    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    



}

PracticeGame.ShootingState.prototype.update = function() {

    if (this.cursors.up.isDown) {
        // this.game.physics.arcade.accelerationFromRotation(this.gun.rotation,0, this.gun.body.acceleration);
    }
    else {
        // this.gun.body.acceleration.set(0);
    }

    if (this.cursors.left.isDown) {
        // this.gun.body.angularVelocity = -300;

        this.policeman.body.velocity.x = -150;
        this.policeman.animations.play('left');
    }
    else if (this.cursors.right.isDown) {
        // this.gun.body.angularVelocity = 300;
        this.policeman.body.velocity.x = 150;
        this.policeman.animations.play('right');
    }
    else {
        this.policeman.body.velocity.x = 0;
        this.policeman.body.velocity.y = 0;
        this.policeman.animations.play('stop');
        // this.gun.body.angularVelocity = 0;
    }

    if (this.fireButton.isDown) {
        this.weapon.fire();
    }

// game.physics.arcade.collide(stars, platforms);
    // this.game.world.wrap(this.policeman, 16);    
    //bullet detection
    
    if( this.robber.body.velocity.x > 0){
        this.robber.animations.play('right')
    }else if(this.robber.body.velocity.x < 0){
        this.robber.animations.play('left')
    }else if(this.robber.body.velocity.x = 0){
        this.robber.animations.play('stop')
    }
    this.game.physics.arcade.overlap(this.weapon.bullets, this.robber, this.detectBullet, null, this);
	this.game.physics.arcade.overlap(this.robber, this.policeman, function(){
	   // this.surveyCount++ 
		this.game.state.start('SurveyStateLearn2X',true,false,this.surveyCount);
	},null,this)
}

PracticeGame.ShootingState.prototype.render = function(){
    //   this.game.debug.body(this.robber);
      this.game.debug.spriteInfo(this.policeman,20,20);
    //   this.game.debug.body(this.weapon.bullets);
    //   this.game.debug.bodyInfo(this.weapon.bullets, 32, 32);
    //   this.game.debug.bodyInfo(this.robber, 132, 132);
    // this.game.debug.text(this.shotCounter + ' talalat ' , 2,14,'#ff0')
}
PracticeGame.ShootingState.prototype.detectBullet = function(bullets,robber){
    console.log('bullet shot')
    this.robber.body.velocity.x = 0
    this.robber.animations.play('dead');
    var timer = this.game.time.create()
    timer.add(Phaser.Timer.SECOND * 3, function(){
    this.robber.body.velocity.x = 150
    console.log('ressurrection')
    this.robber.animations.play('stop');
    }, this);
    timer.start()
    this.weapon.killAll()
    this.shotCounter++
    if(this.shotCounter > 0)  {
// 		this.game.state.start('SurveyState2X');
        this.round++
		this.game.state.start('ShootingState',true,false,this.round,false);
    }
}
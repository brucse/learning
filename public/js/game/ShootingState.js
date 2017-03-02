PracticeGame.ShootingState = function(game) {
    this.bullet = null
        // this.gun = null
    this.policeman = null
    this.robber = null
        //this.game = game

};

PracticeGame.ShootingState.prototype = Object.create(PracticeGameBaseState.prototype)



PracticeGame.ShootingState.prototype.preload = function() {
    //	this.load.image('wall', 'assets/wall.jpg');
    this.load.image('wall', 'assets/sky1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('robber', 'assets/robber_animation4.png', 34, 48);
    this.load.spritesheet('policeman', 'assets/policeman_animation_shooting.png', 34, 68);
    // this.load.spritesheet('gun', 'assets/gun.png', 24, 45);
    this.load.spritesheet('bullet', 'assets/bullet.png', 12, 16);
}


PracticeGame.ShootingState.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.wall = this.add.sprite(0, 0, 'wall');

    //  Creates 30 bullets, using the 'bullet' graphic
    this.bullet = this.game.add.weapon(30, 'bullet');

    //  The bullet will be automatically killed when it leaves the world bounds
    this.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

    //  The speed at which the bullet is fired
    this.bullet.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.bullet.fireRate = 100;

    // this.bullet.angle = 90

    this.policeman = this.add.sprite(this.world.width / 2, this.world.height - 68, 'policeman')

    this.game.physics.arcade.enable(this.policeman);

    // this.gun.body.drag.set(70);
    this.policeman.body.maxVelocity.set(200);
    this.policeman.anchor.setTo(0, 0);
    //  this.gun.angle = -90
    this.bullet.bulletAngleOffset = 90;
    


    this.policeman.animations.add('right', [0, 1, 2], 15, true);
    this.policeman.animations.add('left', [4, 5, 6], 15, true);
    this.policeman.animations.add('stop', [3], 15, false);




    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.bullet.trackSprite(this.policeman, 27, 3, false);

    this.robber = this.add.sprite(this.world.width / 2, 0, 'robber')
    this.game.physics.arcade.enable(this.robber);
    this.robber.enableBody = true
    this.robber.body.collideWorldBounds = true;
    // this.robber.body.onWorldBounds = new Phaser.Signal();
    this.robber.body.bounce.x = 1
    this.robber.body.velocity.x = 150
    
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
        this.bullet.fire();
    }

// game.physics.arcade.collide(stars, platforms);
    // this.game.world.wrap(this.policeman, 16);    

}

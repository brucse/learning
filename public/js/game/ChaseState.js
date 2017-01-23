PracticeGame.ChaseState = function(game) {

};

PracticeGame.ChaseState.prototype = Object.create(PracticeGameBaseState.prototype)

PracticeGame.ChaseState.prototype.preload = function() {
    //	this.load.image('wall', 'assets/wall.jpg');
    this.load.image('wall', 'assets/sky1.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('cage', 'assets/cage.png', 75, 150);
    this.load.spritesheet('policeman', 'assets/policeman_animation.png', 34, 48);
    this.load.spritesheet('robber', 'assets/robber_animation4.png', 34, 48);
    //	this.load.spritesheet('robber', 'assets/robber_animation.png', 34, 48);
    this.load.spritesheet('horizontal', 'assets/horizontal.png', 1, 800);
    this.load.spritesheet('cop_car', 'assets/cop-car.png', 150, 61);
    this.load.spritesheet('prison_cell', 'assets/prison-cell.png', 210, 150);
}


PracticeGame.ChaseState.prototype.create = function() {
    this.CAGE_Y = (this.world.height - (150 + 63));
    //  We're going to be using physics, so enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our this
    wall = this.add.sprite(0, 0, 'wall');

    cage = this.add.sprite(this.CAGE_X, this.CAGE_Y, 'cage');
    this.physics.arcade.enable(cage);
    cage.enableBody = true;
    cage.body.immovable = true;
    //	cage.body.collideWorldBounds = true;

    uplimit = this.add.sprite(0, this.CAGE_Y - 150, 'ground');
    this.physics.arcade.enable(uplimit);
    uplimit.enableBody = true;
    uplimit.body.immovable = true
        //	uplimit.body.collideWorldBounds = true;
    uplimit.scale.setTo(4, 0.5);

    horizontal = this.add.sprite(this.CAGE_X - 30, 0, 'horizontal');
    this.physics.arcade.enable(horizontal);
    horizontal.enableBody = true;
    horizontal.body.collideWorldBounds = true;
    horizontal.alpha = 0;
    horizontal.body.immovable = true;
    horizontal.scale.setTo(10, 10);
    //             uplimit.scale.setTo(2,0.5);

    horizontal2 = this.add.sprite(this.CAGE_X + 180, 0, 'horizontal');
    this.physics.arcade.enable(horizontal2);
    horizontal2.enableBody = true;
    horizontal2.body.collideWorldBounds = true;
    //	horizontal2.alpha = 0;

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;
    //             platforms.body.enable = true;

    // Here we create the ground.
    ground = platforms.create(0, this.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;
    this.physics.arcade.enable(ground);

    // The policeman and its settings
    policeman = this.add.sprite(32, this.world.height - 150,
        'policeman');

    //  We need to enable physics on the policeman
    this.physics.arcade.enable(policeman);

    policeman.enableBody = true;

    //  policeman physics properties. Give the little guy a slight bounce.
    policeman.body.bounce.y = 0.2;
    policeman.body.gravity.y = 300;

    policeman.body.collideWorldBounds = true;
    policeman.body.onWorldBounds = new Phaser.Signal();
    policeman.body.onWorldBounds.add(function() {
        resetWorld();
    }, this);

    policeman.animations.add('right', [0, 1, 2], 15, true);
    policeman.animations.add('left', [4, 5, 6], 15, true);
    policeman.animations.add('stop', [3], 15, false);
    //robber section
    robber = this.add.sprite(policeman.body.x + this.policeman_robber_distance, this.world.height - 150, 'robber');

    this.physics.arcade.enable(robber);

    robber.body.bounce.y = 0.2;
    robber.body.gravity.y = 300;
    robber.body.collideWorldBounds = true;
    robber.body.onWorldBounds = new Phaser.Signal();
    robber.body.onWorldBounds.add(function() {
        if (this.gameState == PracticeGameConstants.GAME_STATES.CAGE_CLOSED_FOR_POLICEMAN) {
            robber.body.velocity.x = -150
        }
        else if (this.gameState == PracticeGameConstants.GAME_STATES.CAGE_OPEN_FOR_POLICEMAN) {
            robber.visible = false
        }
    }, this);
    robber.animations.add('right', [0, 1, 2], 15, true);
    robber.animations.add('left', [4, 5, 6], 15, true);
    robber.animations.add('stop', [3], 15, false);
    //  Our two animations, walking left and right.
    /*    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
    		    policeman.animations.add('right', [5, 6, 7, 8], 10, true);*/

    //    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
    //    policeman.animations.add('right', [5, 6, 7, 8], 10, true);
    cursors = this.input.keyboard.createCursorKeys();

}

PracticeGame.ChaseState.prototype.update = function() {

    //visible error hack, do not set robber visible in resetWorld
    if ((this.gameState == PracticeGameConstants.GAME_STATES.START || this.gameState == PracticeGameConstants.GAME_STATES.ROBBER_IN_PRISON) && robber.visible == false) {
        robber.visible = true
    }

    this.physics.arcade.collide(policeman, platforms);
    this.physics.arcade.collide(robber, platforms);
    this.physics.arcade.collide(cage, platforms, PracticeUtils.cageAndPlatforms);
    this.physics.arcade.collide(robber, cage, PracticeUtils.robberAndCage);
    this.physics.arcade.collide(policeman, cage);
    this.physics.arcade.collide(cage, uplimit, PracticeUtils.cageAndUplimit, null, this);
    this.physics.arcade.collide(policeman, horizontal, PracticeUtils.policemanAndHorizontal, PracticeUtils.policemanAndHorizontalFirst, this);
    this.physics.arcade.overlap(cage, uplimit, PracticeUtils.grandFinale, PracticeUtils.isGrandFinale, this);
    this.physics.arcade.overlap(robber, PracticeUtils.cop_car, function() {
        robber.alpha = 0;
    });
    this.physics.arcade.overlap(policeman, PracticeUtils.cop_car, function() {
        policeman.alpha = 0;
    });

    if (!this.noUpdate) {

    }

    if (cursors.left.isDown) {
        //  Move to the left
        policeman.body.velocity.x = -150;
        //		robber.body.velocity.x = -150;
        if (!questionAnswered)
        //			resetResultInText();
        //                 policeman.animations.play('left');
            this.stopPoliceman = false;
    }
    else if (cursors.right.isDown) {
        //  Move to the right
        if (!this.stopPoliceman) {
            policeman.body.velocity.x = 200;
            robber.body.velocity.x = 200;
        }

        //        policeman.animations.play('right');
    }
    else {
        policeman.body.velocity.x = 0;
        //		policeman.body.velocity.x = 0;
        //  Stand still

        //		policeman.frame = 4;
    }

    if (robber.body.velocity.x > 0) {
        robber.animations.play('right');
    }
    else if (robber.body.velocity.x < 0) {
        robber.animations.play('left');
    }
    else if (robber.body.velocity.x == 0) {
        robber.animations.play('stop');
    }
    else {
        throw 'wrong velocity'
    }

    if (policeman.body.velocity.x > 0) {
        policeman.animations.play('right');
    }
    else if (policeman.body.velocity.x < 0) {
        policeman.animations.play('left');
    }
    else if (policeman.body.velocity.x == 0) {
        policeman.animations.play('stop');
    }
    else {
        throw 'wrong velocity'
    }

    //  Allow the policeman to jump if they are touching the ground.
    if (cursors.up.isDown && policeman.body.touching.down) {
        //                 policeman.body.velocity.y = -350;
    }


    if (this.robberInTheCage) {
        policeman.alpha = 1
        robber.alpha = 1
        if ((robber.position.x + robber.body.width + 5) > (prisonCell.position.x + prisonCell.body.width) && robber.body.velocity.x > 0) {
            robber.body.velocity.x = robber.body.velocity.x * -1
        }
        if (robber.position.x < (prisonCell.position.x + 5) && robber.body.velocity.x < 0) {
            robber.body.velocity.x = robber.body.velocity.x * -1
        }

    }
}

PracticeGame.ChaseState.render = function() {
    
    function render() {
        //	this.debug.inputInfo(32,32)
        //	 this.debug.pointer( this.input.activePointer );
        //	robber.visible = true
        //	this.debug.spriteInfo(robber,400,30,'yellow')
        //	this.debug.key(cursors.left,400,130)
        //	this.debug.spriteInfo(robber,400,30)
        /*	if(prisonCell != null){
        	this.debug.spriteInfo(prisonCell,400,200)
        }
         */
    }

}

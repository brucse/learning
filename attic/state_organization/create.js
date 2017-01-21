function create() {

	CAGE_Y = (this.world.height - (150 + 63));
	//  We're going to be using physics, so enable the Arcade Physics system
	this.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our this
	wall = this.add.sprite(0, 0, 'wall');

	cage = this.add.sprite(CAGE_X, CAGE_Y, 'cage');
	this.physics.arcade.enable(cage);
	cage.enableBody = true;
	cage.body.immovable = true;
//	cage.body.collideWorldBounds = true;

	uplimit = this.add.sprite(0, CAGE_Y - 150, 'ground');
	this.physics.arcade.enable(uplimit);
	uplimit.enableBody = true;
	uplimit.body.immovable = true
//	uplimit.body.collideWorldBounds = true;
	uplimit.scale.setTo(4, 0.5);

	horizontal = this.add.sprite(CAGE_X - 30, 0, 'horizontal');
	this.physics.arcade.enable(horizontal);
	horizontal.enableBody = true;
	horizontal.body.collideWorldBounds = true;
	horizontal.alpha = 0;
	horizontal.body.immovable = true;
	horizontal.scale.setTo(10, 10);
	//             uplimit.scale.setTo(2,0.5);

	horizontal2 = this.add.sprite(CAGE_X + 180, 0, 'horizontal');
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

	policeman.animations.add('right', [0, 1, 2 ], 15, true);
	policeman.animations.add('left', [4,5,6 ], 15, true);
	policeman.animations.add('stop', [3], 15, false);
	//robber section
	robber = this.add.sprite(policeman.body.x + policeman_robber_distance, this.world.height - 150, 'robber');

	this.physics.arcade.enable(robber);

	robber.body.bounce.y = 0.2;
	robber.body.gravity.y = 300;
	robber.body.collideWorldBounds = true;
	robber.body.onWorldBounds = new Phaser.Signal();
	robber.body.onWorldBounds.add(function() {
		if(statusObject.gameState == GAME_STATES.CAGE_CLOSED_FOR_POLICEMAN){
			robber.body.velocity.x = -150
		}else if (statusObject.gameState == GAME_STATES.CAGE_OPEN_FOR_POLICEMAN){
			robber.visible = false
		}
	}, this);
	robber.animations.add('right', [0, 1, 2 ], 15, true);
	robber.animations.add('left', [4,5,6 ], 15, true);
	robber.animations.add('stop', [3], 15, false);
	//  Our two animations, walking left and right.
	/*    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
			    policeman.animations.add('right', [5, 6, 7, 8], 10, true);*/

	//    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
	//    policeman.animations.add('right', [5, 6, 7, 8], 10, true);
	cursors = this.input.keyboard.createCursorKeys();

}
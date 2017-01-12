function create() {

	CAGE_Y = (game.world.height - (150 + 63));
	//  We're going to be using physics, so enable the Arcade Physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//  A simple background for our game
	wall = game.add.sprite(0, 0, 'wall');

	cage = game.add.sprite(CAGE_X, CAGE_Y, 'cage');
	game.physics.arcade.enable(cage);
	cage.enableBody = true;
	cage.body.immovable = true;
//	cage.body.collideWorldBounds = true;

	uplimit = game.add.sprite(0, CAGE_Y - 150, 'ground');
	game.physics.arcade.enable(uplimit);
	uplimit.enableBody = true;
	uplimit.body.immovable = true
//	uplimit.body.collideWorldBounds = true;
	uplimit.scale.setTo(4, 0.5);

	horizontal = game.add.sprite(CAGE_X - 30, 0, 'horizontal');
	game.physics.arcade.enable(horizontal);
	horizontal.enableBody = true;
	horizontal.body.collideWorldBounds = true;
	horizontal.alpha = 0;
	horizontal.body.immovable = true;
	horizontal.scale.setTo(10, 10);
	//             uplimit.scale.setTo(2,0.5);

	horizontal2 = game.add.sprite(CAGE_X + 180, 0, 'horizontal');
	game.physics.arcade.enable(horizontal2);
	horizontal2.enableBody = true;
	horizontal2.body.collideWorldBounds = true;
//	horizontal2.alpha = 0;

	//  The platforms group contains the ground and the 2 ledges we can jump on
	platforms = game.add.group();

	//  We will enable physics for any object that is created in this group
	platforms.enableBody = true;
	//             platforms.body.enable = true;

	// Here we create the ground.
	ground = platforms.create(0, game.world.height - 64, 'ground');

	//  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	ground.scale.setTo(2, 2);

	//  This stops it from falling away when you jump on it
	ground.body.immovable = true;
	game.physics.arcade.enable(ground);

	// The policeman and its settings
	policeman = game.add.sprite(32, game.world.height - 150,
	'policeman');

	//  We need to enable physics on the policeman
	game.physics.arcade.enable(policeman);

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
	robber = game.add.sprite(policeman.body.x + policeman_robber_distance, game.world.height - 150, 'robber');

	game.physics.arcade.enable(robber);

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
	}, game);
	robber.animations.add('right', [0, 1, 2 ], 15, true);
	robber.animations.add('left', [4,5,6 ], 15, true);
	robber.animations.add('stop', [3], 15, false);
	//  Our two animations, walking left and right.
	/*    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
			    policeman.animations.add('right', [5, 6, 7, 8], 10, true);*/

	//    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
	//    policeman.animations.add('right', [5, 6, 7, 8], 10, true);
	cursors = game.input.keyboard.createCursorKeys();

}
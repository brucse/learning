function update() {
	
	if (game.input.activePointer.isDown)
	{
		if(game.input.activePointer.x > (game.world.width /2)){
			//  Move to the right
			if (!statusObject.stopPoliceman) {
				policeman.body.velocity.x = 200;
				robber.body.velocity.x = 200;
			} 		
		}else{
			
			policeman.body.velocity.x = -150;
//			robber.body.velocity.x = -150;
			if (!questionAnswered)
//				resetResultInText();
				//                 policeman.animations.play('left');
				statusObject.stopPoliceman = false;
		}
	}else{
//			policeman.body.velocity.x = 0;
	}
	

	//visible error hack, do not set robber visible in resetWorld
	if((statusObject.gameState == GAME_STATES.START || statusObject.gameState ==  GAME_STATES.ROBBER_IN_PRISON) && robber.visible == false){
		robber.visible = true
	}

	game.physics.arcade.collide(policeman, platforms); 
	game.physics.arcade.collide(robber, platforms);
	game.physics.arcade.collide(cage, platforms, cageAndPlatforms);
	game.physics.arcade.collide(robber,cage,robberAndCage);
	game.physics.arcade.collide(policeman,cage);
	game.physics.arcade.collide(cage,uplimit,cageAndUplimit,null,this);
	game.physics.arcade.collide(policeman,horizontal,policemanAndHorizontal, policemanAndHorizontalFirst);
	game.physics.arcade.overlap(cage,uplimit,grandFinale,isGrandFinale); 
	game.physics.arcade.overlap(robber, cop_car, function(){
		robber.alpha = 0;
	});
	game.physics.arcade.overlap(policeman, cop_car, function(){
		policeman.alpha = 0;
	});

	if (!noUpdate) {

	}

	if (cursors.left.isDown) {
		//  Move to the left
		policeman.body.velocity.x = -150;
//		robber.body.velocity.x = -150;
		if (!questionAnswered)
//			resetResultInText();
		//                 policeman.animations.play('left');
		statusObject.stopPoliceman = false;
	} else if (cursors.right.isDown) {
		//  Move to the right
		if (!statusObject.stopPoliceman) {
			policeman.body.velocity.x = 200;
			robber.body.velocity.x = 200;
		}

		        policeman.animations.play('right');
	} else {

//		policeman.body.velocity.x = 0;
//		policeman.body.velocity.x = 0;
		//  Stand still
//		policeman.animations.stop();

//		policeman.frame = 4;
	}

	//  Allow the policeman to jump if they are touching the ground.
	if (cursors.up.isDown && policeman.body.touching.down) {
		//                 policeman.body.velocity.y = -350;
	}


	if(statusObject.robberInTheCage){
		policeman.alpha = 1
		robber.alpha = 1
		if((robber.position.x + robber.body.width +5)>( prisonCell.position.x + prisonCell.body.width) && robber.body.velocity.x > 0){
			robber.body.velocity.x = robber.body.velocity.x * -1
		}
		if(robber.position.x <( prisonCell.position.x + 5 ) && robber.body.velocity.x < 0){
			robber.body.velocity.x = robber.body.velocity.x * -1
		}

	}
	
	

}


function render(){
//	game.debug.inputInfo(32,32)
//	 game.debug.pointer( game.input.activePointer );
//	robber.visible = true
//	game.debug.spriteInfo(policeman,400,30,'yellow')
//	game.debug.key(cursors.left,400,130)
//	game.debug.spriteInfo(robber,400,30)
	/*	if(prisonCell != null){
		game.debug.spriteInfo(prisonCell,400,200)
	}
	 */}



var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update,
	render: render
});

survey = new Survey(game)

survey.questionarieFilledSignal.add(function(){

	var nextMode 

	switch(statusObject.actualMode){
	case ACTUAL_MODES.INTRODUCTION_MODE:
		nextMode = ACTUAL_MODES.ENGRAVE_MODE
		break
	case ACTUAL_MODES.ENGRAVE_MODE:
		nextMode = ACTUAL_MODES.CHECK_MODE
		break
	case ACTUAL_MODES.CHECK_MODE:
		nextMode = ACTUAL_MODES.SCORE_MODE
		break
	default:

	}

	blocked = false;
	questionAnswered = true;
	moveCageUp();
	statusObject.stopPoliceman = false;
	statusObject.actualMode = nextMode
	statusObject.robberInCageAndRighWall = false
	robber.body.velocity.x = 150
}
)

/*game.load.json('survey_data', 'data/survey_data.js');
var surveyData = game.cache.getJSON('survey_data');
*/survey.loadJSONData(surveyData)

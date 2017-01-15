function cageAndPlatforms(cage,platforms){
	cage.body.velocity.y = 0
}

function robberAndCage(robber, cage) {
	if(statusObject.gameState == GAME_STATES.START){
		cage.body.velocity.y = -400;
		statusObject.gameState = GAME_STATES.CAGE_OPEN_FOR_ROBBER
	}else if (statusObject.gameState == GAME_STATES.CAGE_CLOSED_FOR_POLICEMAN){
		robber.body.velocity.x = 150
	}
}

function cageAndUplimit(cage, uplimit) {
	cage.body.velocity.y = 0
	cageOpen = true;
}

function policemanAndHorizontal(policeman, horizontal) {
	
	if(statusObject.gameState == GAME_STATES.CAGE_OPEN_FOR_ROBBER){
		cage.body.velocity.y = 400;
		policeman.body.velocity.y = 0;
		statusObject.stopPoliceman = true;
		createQuestion(this);
		statusObject.robberInCageAndRighWall = true;
		statusObject.gameState = GAME_STATES.CAGE_CLOSED_FOR_POLICEMAN
		
	}

}


function policemanAndHorizontalFirst(policeman, horizontal) {
	if (horizontal.policemanCollided){
		return false 
	} else{
		horizontal.policemanCollided= true;
		return true;
	}
}

function moveCageUp() {
//	statusObject.robberInCageAndRighWall = true;
	statusObject.gameState = GAME_STATES.CAGE_OPEN_FOR_POLICEMAN
	cage.body.velocity.y = -800;
//	robber.body.collideWorldBounds = false;
}


//var rounds = 0;
//var ROUNDS_LIMIT = 5;



function createQuestion(context) {

	console.log('mode: ' +statusObject.actualMode)
	var textY = 1;
	context.game.__proto__.survey.displaySurvey(statusObject.actualMode)


	context.game.input.keyboard.addCallbacks(context, null, null, keyPress);
	//             keyPressBuffer = [];
}

//var keyPressBuffer = [];


function keyPress(char) {
	console.log('capture key press  ' + char);

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

	this.game.__proto__.survey.handleUserInput(char,statusObject.actualMode,this.game)
}

/*function resetResultInText() {
	keyPressBuffer = [];
}
*/
function resetWorld() {

//	robber.body.velocity.x = -100
	if(policeman.position.x > 5){
	console.log('reset world');
	cage.position.y = CAGE_Y;
	cageOpen = false;
	questionAnswered = false;
	horizontal.policemanCollided = false;
	policeman.position.x = 6
		
//	console.log('set rob vis' + robber.visible)
//	robber.visible = true
//	robber.visible 
//	console.log('set rob vis 2' + robber.visible)
//	robber.body.collideWorldBounds = true;
	robber.position.x = 130
//	robber.position.y = 488
	statusObject.gameState = GAME_STATES.START
	}
}

var grandFinaleOn = true;
function isGrandFinale(x, y) {
	if(statusObject.actualMode == ACTUAL_MODES.SCORE_MODE && grandFinaleOn){
		grandFinaleOn = false
		return true
	}else{
		return false
	}
}

function grandFinale() {
	var game = 	this.game
	//         	alert('finale');
	console.log('finale');
	// 			robber.alpha = 0;
	// 			policeman.alpha = 0;
	cage.alpha = 0;
	game.input.enabled = false;
	robber.body.velocity.x = -100;
	policeman.body.velocity.x = -20;

	robber.body.onWorldBounds.add(function(){
		robber.body.velocity.x= -60;
		// 			policeman.body.velocity.x= -130;
		console.log('new bound')
		cursors.right.isDown = false;
		// 			stopPoliceman = true;
		// 			cursors.enabled = false;
		statusObject.gameState = GAME_STATES.ROBBER_IN_PRISON
	}, this); 

	noUpdate = true;
	statusObject.stopPoliceman = true;

	if(cop_car == null){

		cop_car = game.add.sprite(game.world.width- 150, game.world.height - 120, 'cop_car');
		game.physics.arcade.enable(cop_car);
		cop_car.enableBody = true;
		cop_car.body.velocity.x = -100;

		cop_car.body.collideWorldBounds = true;
		cop_car.body.onWorldBounds = new Phaser.Signal();
		cop_car.body.onWorldBounds.add(robberInTheCage , this);
	}


}

function robberInTheCage(){
	var game = this.game
	cop_car.alpha= 0;
	prisonCell = game.add.sprite(CAGE_X-75,CAGE_Y, 'prison_cell');
	 game.physics.arcade.enable(prisonCell);
	 prisonCell.enableBody = true;
	 robber.alpha= 1
	 robber.position.x = prisonCell.position.x + 60
//	 robber.body.velocity.x = 100
	 statusObject.robberInTheCage = true
	 policeman.position.x = 60
	 policeman.alpha= 1
	 
	 policeman.position.y =game.world.height - 150  
	 policeman.body.bounce.set(1)

}
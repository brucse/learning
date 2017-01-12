
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload : preload,
	create : create,
	update : update
});

function preload() {

	game.load.image('wall', 'assets/wall.jpg');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('cage', 'assets/cage.png', 75, 150);
	game.load.spritesheet('policeman', 'assets/policeman.jpg', 34, 48);
	game.load.spritesheet('robbery', 'assets/robbery.jpg', 34, 48);
	game.load
	.spritesheet('horizontal', 'assets/horizontal.png', 1, 800);
	game.load.spritesheet('cop_car', 'assets/cop-car.png', 150, 61);

}

var platforms;
var cursors;
var cage;
var policeman;
var wall;
var robbery;

//var score = 0;
//var scoreText;
var questionText;

var bmd;
var text;

var ground;

var CAGE_X = 350;
var CAGE_Y;

var upLimit;
var horizontal;
var horizontal2;

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
		policeman.position.x = 10;
		resetWorld();
	}, this);

	//robbery section
	robbery = game.add.sprite(262, game.world.height - 150, 'robbery');

	game.physics.arcade.enable(robbery);

	robbery.body.bounce.y = 0.2;
	robbery.body.gravity.y = 300;
	robbery.body.collideWorldBounds = true;
	robbery.body.onWorldBounds = new Phaser.Signal();
	robbery.body.onWorldBounds.add(function() {
		robbery.position.x = 10;
	}, game);

	//  Our two animations, walking left and right.
	/*    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
			    policeman.animations.add('right', [5, 6, 7, 8], 10, true);*/

	//    policeman.animations.add('left', [0, 1, 2, 3], 10, true);
	//    policeman.animations.add('right', [5, 6, 7, 8], 10, true);
	cursors = game.input.keyboard.createCursorKeys();

}

var stop = false;
var blocked = true;

var reset = true;
var noUpdate = false;
var cop_car;



var INTRODUCTION_MODE = 1;
var ENGRAVE_MODE = 2;
var CHECK_MODE = 3;

var actualRepeatQuestions = [];
var actualEngraveQuestions = []

var statusObject = {
		actualMode : INTRODUCTION_MODE,
		stopPoliceman : false
		
}

function update() {

	game.physics.arcade.collide(policeman, platforms); 
	game.physics.arcade.collide(robbery, platforms);
	game.physics.arcade.collide(cage, platforms, cageAndPlatforms);
	game.physics.arcade.collide(robbery,cage,robberyAndCage);
	game.physics.arcade.collide(cage,uplimit,cageAndUplimit,null,this);
	game.physics.arcade.collide(policeman,horizontal,policemanAndHorizontal, policemanAndHorizontalFirst);
	game.physics.arcade.overlap(robbery,horizontal2,grandFinale,isGrandFinale); 
	game.physics.arcade.overlap(robbery, cop_car, function(){
		robbery.alpha = 0;
	});
	game.physics.arcade.overlap(policeman, cop_car, function(){
		policeman.alpha = 0;
	});

	if (!noUpdate) {
		policeman.body.velocity.x = 0;
		robbery.body.velocity.x = 0;

	}

	if (cursors.left.isDown) {
		//  Move to the left
		policeman.body.velocity.x = -150;
		robbery.body.velocity.x = -150;
		if (!questionAnswered)
			resetResultInText();
		//                 policeman.animations.play('left');
		statusObject.stopPoliceman = false;
	} else if (cursors.right.isDown) {
		//  Move to the right
		if (!statusObject.stopPoliceman) {
			policeman.body.velocity.x = 200;
			robbery.body.velocity.x = 200;
		}

		//        policeman.animations.play('right');
	} else {
		//  Stand still
		policeman.animations.stop();

		policeman.frame = 4;
	}

	//  Allow the policeman to jump if they are touching the ground.
	if (cursors.up.isDown && policeman.body.touching.down) {
		//                 policeman.body.velocity.y = -350;
	}

}

function cageAndPlatforms(cage,platforms){
	cage.body.velocity.y = 0
}

function robberyAndCage(robbery, cage) {
	cage.body.velocity.y = -400;
}

var cageOpen = false;
function cageAndUplimit(cage, uplimit) {
	cage.body.velocity.y = 0
	cageOpen = true;
}

function policemanAndHorizontal(policeman, horizontal) {

	cage.body.velocity.y = 400;
	policeman.body.velocity.y = 0;
	statusObject.stopPoliceman = true;
	createQuestion();

}

var questionAnswered = false;
function policemanAndHorizontalFirst(policeman, horizontal) {
	if (horizontal.policemanCollided){
		return false 
	} else{
		horizontal.policemanCollided= true;
		return true;
	}
}

function openCageUp() {

	cage.body.velocity.y = -800;
}

function moveCageUp() {
	cage.body.velocity.y = -800;
}

var questions = [ "2+2=", "5+5="];
var answers = [ "4", "10" ];

//var repeatQuestions = ["2+2=4", "3+3=6","4+4=8"]
var repeatQuestions = ["2+2=4"]
var engraveQuestions = ["2+2=4", "3+3=6","4+4=8"]
var checkQuestions = repeatQuestions;

//var questions = ["2+2=?"];
//var answers = ["4"];

var randomQuestionKey = Math.round((questions.length -1) * Math.random());



var rounds = 0;
var ROUNDS_LIMIT = 5;

function createQuestion() {
	switch (statusObject.actualMode) {
	case INTRODUCTION_MODE:

		console.log('INTRODUCTION_MODE')
		var textY = 1;
		for(i = 0; i < repeatQuestions.length ; i++){
			var repeatText = new RepeatText(20,textY,repeatQuestions[i])
			actualRepeatQuestions.push(repeatText);
			textY = repeatText.bottomY() + 70;
//			if(i == 0) repeatText.startBlinking();
		}
		break;
		
	case ENGRAVE_MODE:
		var textY = 1
		console.log('engrave')
		_.each(engraveQuestions,function(value){
			var engraveText = new EngraveQuestion(20,textY,value)
			actualEngraveQuestions.push(engraveText)
			textY = engraveText.bottomY() 
		})
		break;

	case CHECK_MODE:
		var textY = 1
		var randomQuestionKey = Math.round((checkQuestions.length -1) * Math.random());
		console.log('check')
		_.each(checkQuestions,function(value,key){
			var engraveText = new EngraveQuestion(20,textY,value)
			actualEngraveQuestions.push(engraveText)
			textY = engraveText.bottomY() 
		})
		break;
	default:
		break;
	}

	game.input.keyboard.addCallbacks(this, null, null, keyPress);
	//             keyPressBuffer = [];
}

var keyPressBuffer = [];

var x = 0;

function keyPress(char) {
	console.log('capture key press  ' + char);

	switch (statusObject.actualMode) {
	case INTRODUCTION_MODE:

		var actualRepeatQuestion;

		//find which one is in progress
		actualRepeatQuestion = _.find(actualRepeatQuestions,{"isOnRepeat":true})
		if(!actualRepeatQuestion){
			_.each(actualRepeatQuestions,function(it){
				if(!it.isFullFilled()){
					actualRepeatQuestion = it;
					actualRepeatQuestion.isOnRepeat;
					return false;
				}
			})
		}

		//add the next char
		actualRepeatQuestion.addNextChar(char);
		if(actualRepeatQuestion.isFullFilled()){
			actualRepeatQuestion.isOnRepeat = false;
			actualRepeatQuestion.setFullFilledFace();
		}
		
		
		//check is everything is complete
		if(actualRepeatQuestion === _.last(actualRepeatQuestions) && actualRepeatQuestion.isFullFilled()){
			blocked = false;
			questionAnswered = true;
			moveCageUp();
			statusObject.stopPoliceman = false;
			_.each(actualRepeatQuestions,function(it){
				it.destroy()
			})
			_.remove(actualRepeatQuestions)
			statusObject.actualMode = ENGRAVE_MODE;
		}
		break;

	case ENGRAVE_MODE:

        var actualEngraveQuestion;

		//find which one is in progress
		actualEngraveQuestion = _.find(actualEngraveQuestions,{"isInUse":true})
		if(!actualEngraveQuestion){
			_.each(actualEngraveQuestions,function(it){
				if(!it.isFullFilled()){
					actualEngraveQuestion = it;
					actualEngraveQuestion.isOnRepeat;
					return false;
				}
			})
		}

		//add the next char
		actualEngraveQuestion.addNextChar(char);
		if(actualEngraveQuestion.isFullFilled()){
			actualEngraveQuestion.isOnRepeat = false;
			actualEngraveQuestion.setFullFilledFace();
		}
		
		
		//check is everything is complete
		if(actualEngraveQuestion === _.last(actualEngraveQuestions) && actualEngraveQuestion.isFullFilled()){
			blocked = false;
			questionAnswered = true;
			moveCageUp();
			statusObject.stopPoliceman = false;
			_.each(actualEngraveQuestions,function(it){
				it.destroy()
			})
			_.remove(actualEngraveQuestion)
			statusObject.actualMode = CHECK_MODE;
		}
		break;
		
	case CHECK_MODE:
		
		break
	default:
		break;
	}

	//                 x += bmd.context.measureText(letter).width;
}

function resetResultInText() {
//	text.destroy();
	keyPressBuffer = [];
	text.text =  questions[randomQuestionKey]
}

function resetWorld() {
	console.log(randomQuestionKey);
	console.log('reset world');
//	text.text = '';
//	`text.destroy();
//	text = null;
	cage.position.y = CAGE_Y;
	cageOpen = false;
	questionAnswered = false;
	keyPressBuffer = [];
	randomQuestionKey = Math.round((questions.length - 1) * Math.random());
	rounds++;
	horizontal.policemanCollided = false;
}

var grandFinaleOn = true;
function isGrandFinale(x, y) {
	console.log('rounds ' + rounds + 'fin ' + grandFinaleOn);
	if (rounds >= ROUNDS_LIMIT && grandFinaleOn) {
		console.log('is grand finale')
		grandFinaleOn = false;
		return true;
	} else {
		return false;
	}
}

function grandFinale() {
	//         	alert('finale');
	console.log('finale');
	// 			robbery.alpha = 0;
	// 			policeman.alpha = 0;
	cage.alpha = 0;
	game.input.enabled = false;
	robbery.body.velocity.x = 10;
	policeman.body.velocity.x = -20;

	/*             robbery.body.onWorldBounds.add(function(){
			 robbery.body.velocity.x= -60;
			 // 			policeman.body.velocity.x= -130;
			 console.log('new bound')
			 cursors.right.isDown = false;
			 // 			stopPoliceman = true;
			 // 			cursors.enabled = false;
			 }, this); */

	noUpdate = true;
	statusObject.stopPoliceman = true;

	cop_car = game.add.sprite(0,
			game.world.height - 120, 'cop_car');
	game.physics.arcade.enable(cop_car);
	cop_car.enableBody = true;
	cop_car.body.collideWorldBounds = true;
	cop_car.body.velocity.x = 150;

	cop_car.body.onWorldBounds = new Phaser.Signal();
	cop_car.body.onWorldBounds.add(function() {
		cop_car.alpha= 0;
		text.destroy();
		game.add.text(50, game.world.centerY, "Elkaptad a rablót !!!!\n Ügyes vagy !!!", {
			font : "65px Arial",
			fill : "yellow",
			align : "center"
		});
	}, this);

}
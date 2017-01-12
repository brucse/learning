var stop = false;
var blocked = true;

var reset = true;
var noUpdate = false;
var cop_car;





var ACTUAL_MODES ={
 INTRODUCTION_MODE : 1,
 ENGRAVE_MODE : 2,
 CHECK_MODE : 3,
 MOVE_CAGE_UP_MODE: 4, //????
 SCORE_MODE: 5
}


var GAME_STATES = {
		START : 1,  // robber and policeman arrive in the game, behind left wall an cage. cage is down
		CAGE_OPEN_FOR_ROBBER : 2, // cage open for robber who can run over, policeman is left from cage
//		ROBBER_OVER_CAGE_BUT_CANT_ESCAPE : 3, // robber over the cage, can't over the right wall, can't go back 
		//to the cage's left side, policeman is left from cage
		CAGE_CLOSED_FOR_POLICEMAN : 4, //policeman cannot run over the cage, he is on the left side, robbery is on the right side, cage is down
		CAGE_OPEN_FOR_POLICEMAN : 5, //cage open for policeman who can run over the cage , robber is in the right side of cage
		//@todo : implement as game status phraser object
		ARRESTING : 6, // police car comes and catch robber
		ROBBER_IN_PRISON : 7 // robber in the prison 
		
}

//var actualRepeatQuestions = [];
//var actualEngraveQuestions = []

var statusObject = {
		actualMode : null, 
//		actualMode : ACTUAL_MODES.INTRODUCTION_MODE,
/*		actualMode : CHECK_MODE,
		actualMode : ENGRAVE_MODE,
*/		stopPoliceman : false,
		robberInTheCage : false,
//		robberInCageAndRighWall : false,
		gameState : GAME_STATES.START

}




var platforms;

var cursors;
var cage;
var policeman;
var wall;
var robber;

//var score = 0;
//var scoreText;
var questionText;

var bmd;
var text;

var ground;

var CAGE_X = 350;
var CAGE_Y;

var policeman_robber_distance = 230

var upLimit;
var horizontal;
var horizontal2;
var prisonCell 





var cageOpen = false;
var questionAnswered = false;
var x = 0;



/*var surveyData = {
		questions :[
			{question:'2+2=4',answer:'x',mode:'INTRODUCTION_MODE'},
			{question:'3+3=6',answer:'x',mode:'INTRODUCTION_MODE'},
			{question:'4+4=8',answer:'x',mode:'INTRODUCTION_MODE'},
			{question:'2+2=',answer:'4',mode:'ENGRAVE_MODE'},
			{question:'3+3=',answer:'6',mode:'ENGRAVE_MODE'},
			{question:'4+4=',answer:'8',mode:'ENGRAVE_MODE'},
			{question:'2+2=',answer:'4',mode:'CHECK_MODE'},
			{question:'3+3=',answer:'6',mode:'CHECK_MODE'},
			{question:'4+4=',answer:'8',mode:'CHECK_MODE'},
			]

}
*/
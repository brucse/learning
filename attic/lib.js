function n(x,y,questionText,settings){

	if(!settings){
		settings = {
				font : "65px Arial",
				fill : "#ffffff",
				align : "left"
		}
	}


	var gameTextObject;
	var internalText = questionText;

	gameTextObject = game.add.text(x, y,internalText,settings);

	this.addAnswer = function(result){
		var question = internalText.split("=")
		if(split.length > 0){
			gameTextObject.text = internalText + " = " + result;
		}else{
			throw "empty string"
		}
	}

	this.resetText = function(){
		gameTextObject.text = ""
	}



}

//var originalTextInArray = originalTextInArray.split("")
//var repeatTextArray = []

function RepeatText(x,y,originalText){

	var originalTextInArray = originalText.split("")
	var repeatTextArray = []

	var gameTextObject;
	var repeatTextObject
//	var internalText = originalText;

	var isOnRepeat

	settings = {
			font : "65px Arial",
			fill : "#ffffff",
			align : "left"
	}

	repeatSettings = {
			font : "65px Arial",
			fill : "#ffffff",
			align : "left"
	}





	gameTextObject = game.add.text(x, y,originalText,settings);
	repeatTextObject = game.add.text(x , y + 50,"?",repeatSettings);
	var tweenA;

	this.addNextChar = function(char){

		if(originalTextInArray.length >= repeatTextArray.length){
			if(char == originalTextInArray[repeatTextArray.length ]){
				//good case
				repeatTextArray.push(char)
				repeatTextObject.text = repeatTextArray.join("")
//				gameTextObject.addColor('#ffff00', 0);  
//				gameTextObject.addColor('#ffffff', repeatTextArray.length -2);  
			}else{
				//the character is wrong
				//todo make loop -> blinking
//				game.add.tween(repeatTextObject).to( { alpha:  0.5}, 100, "Linear", true);
			}

		}
	}

	this.resetText = function(){
		gameTextObject.text = ""
	}

	this.isFullFilled = function(){
		if(_.isEqual(originalTextInArray,repeatTextArray)){
			return true;
		}else{
			return false;
		}

	}

	this.bottomY = function(){
		return repeatTextObject.y;
	}

	this.startBlinking = function(){
		repeatTextObject.alpha = 0;
		tweenA = game.add.tween(repeatTextObject).to( { alpha: 1 }, 200, "Linear", true).loop(true);

	}

	this.stopBlinking = function(){
		tweenA.stop();
	}


	this.setFullFilledFace = function(){
		gameTextObject.addColor("green",0)
	}

	this.destroy = function(){
		gameTextObject.destroy();
		repeatTextObject.destroy();
	}
}

function EngraveQuestion(x,y,originalText){

	var originalTextInArray = originalText.split("")
	var engraveTextInArray = originalText.split("=")[0].split("")
	var originalAnswerTextInArray = originalText.split("=")[1].split("")

	
	var isInUse

	var answerTextInArray = []
	var gameTextObject;
	var answerTextObject

	var isOnRepeat

	settings = {
			font : "65px Arial",
			fill : "#ffffff",
			align : "left"
	}

	repeatSettings = {
			font : "65px Arial",
			fill : "#ffffff",
			align : "left"
	}

	gameTextObject = game.add.text(x, y,engraveTextInArray.join("") + "=",settings);
	answerTextObject = game.add.text(x + gameTextObject.width, y,"?",repeatSettings);
	var tweenA;

	this.addNextChar = function(char){



		if(originalAnswerTextInArray.length >= answerTextInArray.length){
			if(char == originalAnswerTextInArray[answerTextInArray.length ]){
				//good case
				answerTextInArray.push(char)
				answerTextObject.text = answerTextInArray.join("")
//				answerTextObject.text = 'f'
//				gameTextObject.addColor('#ffff00', 0);  
//				gameTextObject.addColor('#ffffff', repeatTextArray.length -2);  
			}else{
				//the character is wrong
				//todo make loop -> blinking
//				game.add.tween(repeatTextObject).to( { alpha:  0.5}, 100, "Linear", true);
			}

		}
	}

	this.destroy = function(){
		gameTextObject.destroy();
		answerTextObject.destroy()
		
	}
	
	
	this.isFullFilled = function(){
		if(_.isEqual(originalAnswerTextInArray,answerTextInArray)){
			return true;
		}else{
			return false;
		}

	}

	this.bottomY = function(){
		return gameTextObject.y + gameTextObject.height;
	}

	this.setFullFilledFace = function(){
		answerTextObject.addColor("green",0)
	}
	
	this.toString = function(){
		return originalText
	}
}

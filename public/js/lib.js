var Questionarie = function (question,rightAnswer,mode,game){

	this.question = question
	this.rightAnswer = rightAnswer
	this.mode = mode
	this.isActual = false;
	this.isAnswered = false;
	this.gameTextObject
	this.answerTextObject
	this.questionMarkTextObject
	this.isVisible = false
	this.inputCharacterArray = []
	this.game = game

	this.questionSettings = {
			font : "65px Arial",
			fill : "#ffffff",
			align : "left"
	}


	this.setUserAnswer = function(userAnswer){
		this.userAnswer =  userAnswer
	}

	this.compareUserAnswerToRightAnswer = function (){

	}

	this.isAnswerComplete = function(){
		if(this.inputCharacterArray.length == rightAnswer.length)
			return true
			else
				return false

	}

	this.displayUserAnswer= function(){

	}
	this.displayComparsionResult = function(){

	}

	this.feedWithJSON = function(JSONData){
	}

	this.destroy = function(){
		this.gameTextObject.destroy()
		this.answerTextObject.destroy()
	}

} 

Questionarie.prototype.displayQuestion = function(game,x,y){

	this.gameTextObject = game.add.text(x, y,this.question,this.questionSettings);
	this.isVisible = true

}

Questionarie.prototype.showFullFilledFace = function(){
		this.answerTextObject.addColor("green",0)
}

var RepeatQuestionarie = function(question,rightAnswer,mode,game){
	Questionarie.call(this,question,rightAnswer,mode,game)
	this.isFullfilled = false 
}

RepeatQuestionarie.prototype = Object.create(Questionarie.prototype)

RepeatQuestionarie.prototype.constructor = RepeatQuestionarie

RepeatQuestionarie.prototype.addNextChar = function(char){
	this.questionSettings.fill = 'green'
//	@todo ???
	if(this.answerTextObject == null){
		this.answerTextObject = game.add.text(this.gameTextObject.x + this.gameTextObject.width + 20, this.gameTextObject.y,'',this.questionSettings);
	}

	if(!this.isAnswerComplete()){
		if(char == this.rightAnswer[this.inputCharacterArray.length ]){
			//good case
			this.inputCharacterArray.push(char)
			this.answerTextObject.text = this.inputCharacterArray.join("")
			//@todo show it's right
//			gameTextObject.addColor('#ffff00', 0);  
//			gameTextObject.addColor('#ffffff', repeatTextArray.length -2);  
			if(_.isEqual(this.rightAnswer,this.answerTextObject.text)){
				this.isAnswered = true
			}else{
				this.isAnswered = false
			}
		}else{
			//@todo show it's wrong
			//the character is wrong
			//todo make loop -> blinking
//			game.add.tween(repeatTextObject).to( { alpha:  0.5}, 100, "Linear", true);
		}
	}else{
//		this.isAnswered= true
	}

}



var EngraveQuestionarie = function(question,rightAnswer,mode,game){
	Questionarie.call(this,question,rightAnswer,mode,game)
	this.isFullfilled = false 
}

EngraveQuestionarie.prototype = Object.create(Questionarie.prototype)

EngraveQuestionarie.prototype.constructor = EngraveQuestionarie

EngraveQuestionarie.prototype.displayQuestion = function(game,x,y){


	//@todo use parent function

	this.gameTextObject = game.add.text(x, y,this.question,this.questionSettings);
	
	this.questionMarkTextObject = game.add.text(this.gameTextObject.x + this.gameTextObject.width , y,'?',this.questionSettings);

	/*			var repeatText = new RepeatText(20,textY,this)
			actualRepeatQuestions.push(repeatText);
			textY = repeatText.bottomY() + 70;*/
//	if(i == 0) repeatText.startBlinking();
}

EngraveQuestionarie.prototype.addNextChar = function(char){

	this.questionMarkTextObject.destroy()
	
	this.questionSettings.fill

	if(this.answerTextObject == null){
		this.answerTextObject = game.add.text(this.gameTextObject.x +  x + this.gameTextObject.width , this.gameTextObject.y,'',this.questionSettings);
	}

	if(!this.isAnswerComplete()){
		if(char == this.rightAnswer[this.inputCharacterArray.length ]){
			//good case
			this.inputCharacterArray.push(char)
			this.answerTextObject.text = this.inputCharacterArray.join("")
			this.answerTextObject.addColor('green',0)
			//@todo show it's right
//			gameTextObject.addColor('#ffff00', 0);  
//			gameTextObject.addColor('#ffffff', repeatTextArray.length -2);  
			if(_.isEqual(this.rightAnswer,this.answerTextObject.text)){
				this.isAnswered = true
			}else{
				this.isAnswered = false
			}
		}else{
//			this.answerTextObject.text.addColor('red',0)
			//@todo show it's wrong
			//the character is wrong
			//todo make loop -> blinking
//			game.add.tween(repeatTextObject).to( { alpha:  0.5}, 100, "Linear", true);
		}
	}else{
//		this.isAnswered= true
	}

}


var CheckQuestionarie = function(question,rightAnswer,mode,game){
	Questionarie.call(this,question,rightAnswer,mode,game)
	this.inputCharacterArray = []
	this.isFullfilled = false 
	this.usedIndex = -1
}

CheckQuestionarie.prototype = Object.create(Questionarie.prototype)

CheckQuestionarie.prototype.constructor = CheckQuestionarie

CheckQuestionarie.prototype.addNextChar = function(char){

//	this.questionMarkTextObject.destroy()

	if(this.answerTextObject == null){
		this.answerTextObject = game.add.text(this.gameTextObject.x +  x + this.gameTextObject.width , this.gameTextObject.y,'',this.questionSettings);
	}

	if(!this.isAnswerComplete()){
		if(char == this.rightAnswer[this.inputCharacterArray.length ]){
			//good case
			this.inputCharacterArray.push(char)
			this.answerTextObject.text = this.inputCharacterArray.join("")
			this.answerTextObject.addColor('green',0)
			//@todo show it's right
//			gameTextObject.addColor('#ffff00', 0);  
//			gameTextObject.addColor('#ffffff', repeatTextArray.length -2);  
			if(_.isEqual(this.rightAnswer,this.answerTextObject.text)){
				this.isAnswered = true
			}else{
				this.isAnswered = false
			}
		}else{
			//@todo show it's wrong
			//the character is wrong
			//todo make loop -> blinking
//			game.add.tween(repeatTextObject).to( { alpha:  0.5}, 100, "Linear", true);
		}
	}else{
//		this.isAnswered= true
	}

}

CheckQuestionarie.prototype.showFullFilledFace = function(){
	this.destroy()
}





var Survey = function (game){

	this.game = game
	this.questionsInINTRODUCTION_MODE=[]
	this.questionsInENGRAVE_MODE=[]
	this.questionsInCHECK_MODE=[]
	this.isActualQuestonarieFulfilled = false;
	this.questionarieFilledSignal = new Phaser.Signal()
	this.surveyFilledSignal = new Phaser.Signal()

	this.loadJSONData = function(surveyData){
		for(var i = 0; i < surveyData.questions.length; i++){
			var actual = surveyData.questions[i]
//			var questionarie = new Questionarie(actual.question,actual.answer,actual.mode)
			switch(actual.mode){
			case "INTRODUCTION_MODE":
				this.questionsInINTRODUCTION_MODE.push(new RepeatQuestionarie(actual.question,actual.answer,actual.mode,this.game))
				break;
			case "ENGRAVE_MODE":
				this.questionsInENGRAVE_MODE.push(new EngraveQuestionarie(actual.question,actual.answer,actual.mode,this.game))
				break;
			case "CHECK_MODE":
				this.questionsInCHECK_MODE.push(new CheckQuestionarie(actual.question,actual.answer,actual.mode,this.game))
				this.questionsInCHECK_MODE=_.shuffle(this.questionsInCHECK_MODE)
				break;
			default :
			}
		}
	}

	this.getAvaiableStatuses =  function(){
		var ret = []
		if(_.size(this.questionsInINTRODUCTION_MODE) > 0){
			ret.push( ACTUAL_MODES.INTRODUCTION_MODE)
		}

		if(_.size(this.questionsInENGRAVE_MODE) > 0){
			ret.push(ACTUAL_MODES.ENGRAVE_MODE)
		}

		if(_.size(this.questionsInCHECK_MODE) > 0){
			ret.push(ACTUAL_MODES.CHECK_MODE)
		}
		
		ret.push(ACTUAL_MODES.SCORE_MODE)
		
		return ret
	}
	
	
	
	var questionLineGap
	this.displaySurvey= function(mode){

		var questionsArray  

		switch(mode){
		case ACTUAL_MODES.INTRODUCTION_MODE:
//			case "INTRODUCTION_MODE":
			questionsArray = this.questionsInINTRODUCTION_MODE
			questionLineGap = 80
			break;
		case ACTUAL_MODES.ENGRAVE_MODE:
			questionsArray = this.questionsInENGRAVE_MODE
			questionLineGap = 80
			break;
		case ACTUAL_MODES.CHECK_MODE:
			questionsArray = this.questionsInCHECK_MODE
			questionLineGap = 0
			break;
		default :
		}

		if(mode != ACTUAL_MODES.CHECK_MODE){
			for(var i= 0; i < questionsArray.length; i++){
				questionsArray[i].displayQuestion(game,1,questionLineGap*i)
			}
		}else{
			questionsArray[0].displayQuestion(game,1,questionLineGap*i)
		}
	}


	this.handleUserInput = function(inputChar,mode){
		var actualQuestion	
		var actualQuestionsArray

		switch(mode){
		case ACTUAL_MODES.INTRODUCTION_MODE:
			actualQuestionsArray = this.questionsInINTRODUCTION_MODE
			break;
		case ACTUAL_MODES.ENGRAVE_MODE:
			actualQuestionsArray = this.questionsInENGRAVE_MODE
			break;
		case ACTUAL_MODES.CHECK_MODE:
			actualQuestionsArray = this.questionsInCHECK_MODE
			break;
		default :
		}

		//find actual question
		actualQuestion = _.find(actualQuestionsArray,{"isActual":true})
		if(!actualQuestion){
			_.each(actualQuestionsArray,function(it){
				if(!it.isAnswered){
					actualQuestion = it;
					actualQuestion.isActual = true;
					return false;
				}
			})
		} 



		actualQuestion.addNextChar(inputChar);
		if(actualQuestion.isAnswerComplete()){
			if(actualQuestion.isAnswered){
				//check is everything is complete
				if(actualQuestion === _.last(actualQuestionsArray)){
					//end of questionarie
					this.game.time.events.add(200,function(){
						
					this.isActualQuestonarieFulfilled = true;
					_.each(actualQuestionsArray,function(it){
						it.destroy()
					})
					_.remove(actualQuestionsArray)
					this.questionarieFilledSignal.dispatch()
					//@todo ???
//					statusObject.actualMode = SCORE_MODE;

						
					},this)

				}else{
					//calling the next question
					actualQuestion.isActual = false
				if(mode == ACTUAL_MODES.CHECK_MODE){
					this.game.time.events.add(2000,function(){
					actualQuestion.showFullFilledFace()
					_.each(actualQuestionsArray,function(it){
						if(!it.isAnswered){
							actualQuestion = it;
							actualQuestion.isActual = true;
							/*					if(mode == CHECK_MODE && !actualQuestion.isVisible ){
							actualQuestion.displayQuestion(game,1,0)
						}*/
							return false;
						}
					})
					actualQuestion.displayQuestion(game,1,questionLineGap)
						
					}, this);
				}

				}

			}

		}
	}

	checkSurveyCompletion = function(){

	}
}












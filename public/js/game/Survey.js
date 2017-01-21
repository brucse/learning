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
			ret.push( PracticeGame.ACTUAL_MODES.INTRODUCTION_MODE)
		}

		if(_.size(this.questionsInENGRAVE_MODE) > 0){
			ret.push(PracticeGame.ACTUAL_MODES.ENGRAVE_MODE)
		}

		if(_.size(this.questionsInCHECK_MODE) > 0){
			ret.push(PracticeGame.ACTUAL_MODES.CHECK_MODE)
		}
		
		ret.push(PracticeGame.ACTUAL_MODES.SCORE_MODE)
		
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


	this.handleUserInput = function(inputChar,mode,game){
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



		actualQuestion.addNextChar(inputChar,game);
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


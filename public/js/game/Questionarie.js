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

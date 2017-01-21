var CheckQuestionarie = function(question,rightAnswer,mode,game){
	Questionarie.call(this,question,rightAnswer,mode,game)
	this.inputCharacterArray = []
	this.isFullfilled = false 
	this.usedIndex = -1
}

CheckQuestionarie.prototype = Object.create(Questionarie.prototype)

CheckQuestionarie.prototype.constructor = CheckQuestionarie

CheckQuestionarie.prototype.addNextChar = function(char,game){

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


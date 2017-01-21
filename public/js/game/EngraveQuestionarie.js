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

EngraveQuestionarie.prototype.addNextChar = function(char,game){

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

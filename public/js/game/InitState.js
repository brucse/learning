PracticeGame.InitState = function(){
    
}
PracticeGame.InitState.prototype = Object.create(PracticeGameBaseState.prototype)
    
    
    
PracticeGame.InitState.prototype.create = function() {
	this.state.start('ChaseStateIntroduction');
}




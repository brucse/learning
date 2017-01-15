function update() {

	//visible error hack, do not set robber visible in resetWorld
	if((statusObject.gameState == GAME_STATES.START || statusObject.gameState ==  GAME_STATES.ROBBER_IN_PRISON) && robber.visible == false){
		robber.visible = true
	}

	this.physics.arcade.collide(policeman, platforms); 
	this.physics.arcade.collide(robber, platforms);
	this.physics.arcade.collide(cage, platforms, cageAndPlatforms);
	this.physics.arcade.collide(robber,cage,robberAndCage);
	this.physics.arcade.collide(policeman,cage);
	this.physics.arcade.collide(cage,uplimit,cageAndUplimit,null,this);
	this.physics.arcade.collide(policeman,horizontal,policemanAndHorizontal, policemanAndHorizontalFirst,this);
	this.physics.arcade.overlap(cage,uplimit,grandFinale,isGrandFinale,this); 
	this.physics.arcade.overlap(robber, cop_car, function(){
		robber.alpha = 0;
	});
	this.physics.arcade.overlap(policeman, cop_car, function(){
		policeman.alpha = 0;
	});

	if (!noUpdate) {

	}

	if (cursors.left.isDown) {
		//  Move to the left
		policeman.body.velocity.x = -150;
//		robber.body.velocity.x = -150;
		if (!questionAnswered)
//			resetResultInText();
		//                 policeman.animations.play('left');
		statusObject.stopPoliceman = false;
	} else if (cursors.right.isDown) {
		//  Move to the right
		if (!statusObject.stopPoliceman) {
			policeman.body.velocity.x = 200;
			robber.body.velocity.x = 200;
		}

		//        policeman.animations.play('right');
	} else {
		policeman.body.velocity.x = 0;
//		policeman.body.velocity.x = 0;
		//  Stand still

//		policeman.frame = 4;
	}
	
	if(robber.body.velocity.x >0){
		robber.animations.play('right');
	}else if(robber.body.velocity.x < 0){
		robber.animations.play('left');
	}else if(robber.body.velocity.x == 0){
		robber.animations.play('stop');
	}else {
		throw 'wrong velocity'
	}

	if(policeman.body.velocity.x >0){
		policeman.animations.play('right');
	}else if(policeman.body.velocity.x < 0){
		policeman.animations.play('left');
	}else if(policeman.body.velocity.x == 0){
		policeman.animations.play('stop');
	}else {
		throw 'wrong velocity'
	}

	//  Allow the policeman to jump if they are touching the ground.
	if (cursors.up.isDown && policeman.body.touching.down) {
		//                 policeman.body.velocity.y = -350;
	}


	if(statusObject.robberInTheCage){
		policeman.alpha = 1
		robber.alpha = 1
		if((robber.position.x + robber.body.width +5)>( prisonCell.position.x + prisonCell.body.width) && robber.body.velocity.x > 0){
			robber.body.velocity.x = robber.body.velocity.x * -1
		}
		if(robber.position.x <( prisonCell.position.x + 5 ) && robber.body.velocity.x < 0){
			robber.body.velocity.x = robber.body.velocity.x * -1
		}

	}
	
	

}


function render(){
//	this.debug.inputInfo(32,32)
//	 this.debug.pointer( this.input.activePointer );
//	robber.visible = true
//	this.debug.spriteInfo(robber,400,30,'yellow')
//	this.debug.key(cursors.left,400,130)
//	this.debug.spriteInfo(robber,400,30)
	/*	if(prisonCell != null){
		this.debug.spriteInfo(prisonCell,400,200)
	}
	 */}




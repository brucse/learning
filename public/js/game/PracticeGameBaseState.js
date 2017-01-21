var PracticeGameBaseState = function() {}


PracticeGameBaseState.prototype = Object.create(Phaser.State.prototype);
//@todo check is it needed
// PracticeGameBaseState.prototype.constructor = PracticeGameBaseState


PracticeGameBaseState.prototype.gameState = null


PracticeGameBaseState.prototype.platforms

PracticeGameBaseState.prototype.cursors
PracticeGameBaseState.prototype.cage
PracticeGameBaseState.prototype.policeman
PracticeGameBaseState.prototype.wall
PracticeGameBaseState.prototype.robber

// score = 0,
// scoreText,
PracticeGameBaseState.prototype.questionText

PracticeGameBaseState.prototype.bmd
PracticeGameBaseState.prototype.text

PracticeGameBaseState.prototype.ground

PracticeGameBaseState.prototype.CAGE_X = 350
PracticeGameBaseState.prototype.CAGE_Y

PracticeGameBaseState.prototype.policeman_robber_distance = 230

PracticeGameBaseState.prototype.upLimit
PracticeGameBaseState.prototype.horizontal
PracticeGameBaseState.prototype.horizontal2
PracticeGameBaseState.prototype.prisonCell





PracticeGameBaseState.prototype.cageOpen = false
PracticeGameBaseState.prototype.questionAnswered = false


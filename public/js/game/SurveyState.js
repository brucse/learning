PracticeGame.SurveyState = function(game) {
    this.parking_lot
    this.

};

PracticeGame.SurveyState.prototype = Object.create(PracticeGameBaseState.prototype)

PracticeGame.SurveyState.prototype.preload = function() {

    this.load.spritesheet('cop_car', 'assets/cop-car_small.png', 60, 24);
    this.load.spritesheet('parking_lot', 'assets/parking_lot.png', 300, 150);
    this.load.image('wall', 'assets/sky1.png');
}

PracticeGame.SurveyState.prototype.create = function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.wall = this.add.sprite(0, 0, 'wall');
    

    this.parking_lot_X = this.world.width - 300 - 45
    this.parking_lot_Y = this.world.height - 150 - 30
    this.parking_lot = this.add.sprite(this.parking_lot_X, this.parking_lot_Y, 'parking_lot');
    this.parking_lot.enableBody = true
    this.physics.arcade.enable(this.parking_lot)


    this.carGroup = this.add.group()
    this.carGroup.enableBody = true
    var halfLine = this.world.width / 2

    // this.carGroup.scale.setTo(0.5,0.5)
    this.car1 = this.carGroup.create(halfLine + 10, 10, 'cop_car')
    this.car2 = this.carGroup.create(halfLine + 150, 10, 'cop_car')


    this.carGroup.inputEnableChildren = true;


    //  Enable input and allow for dragging
    this.car1.inputEnabled = true;
    this.car1.input.enableDrag();
    this.car2.inputEnabled = true;
    this.car2.input.enableDrag();
    // this.car1.events.onDragStart.add(this.utils.onDragStart, this);
    this.car1.events.onDragStop.add(this.utils.onDragStop, this);
    this.car2.events.onDragStop.add(this.utils.onDragStop, this);


}


PracticeGame.SurveyState.prototype.utils = {

    onDragStop: function(source, pointer) {
        if (this.utils.includedIn( this.parking_lot,source)) {
            console.log('ok in it')
        }

    },

    includedIn: function(includer, spriteOnCheck) {
        if (spriteOnCheck.position.x > includer.position.x && spriteOnCheck.position.x < (includer.position.x + includer.body.width) &&
            spriteOnCheck.position.y > includer.position.y && (spriteOnCheck.position.y < includer.position.y + includer.body.height)) {
            return true
        }
        else {
            return false
        }

    }

}

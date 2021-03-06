PracticeGame.SurveyState = function(game) {
    this.carStockCount = 11
    this.parking_lot
    this.carList = []
    this.carCount = 4

};

PracticeGame.SurveyState.prototype = Object.create(PracticeGameBaseState.prototype)

PracticeGame.SurveyState.prototype.preload = function() {

    this.load.spritesheet('cop_car', 'assets/cop-car_small.png', 60, 24);
    this.load.spritesheet('parking_lot', 'assets/parking_lot.png', 300, 150);
    this.load.spritesheet('ready_button', 'assets/ready_button_sheet.png', 45, 23);
    this.load.image('wall', 'assets/sky1.png');
}

PracticeGame.SurveyState.prototype.create = function() {
    var halfLine = this.world.width / 2

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.wall = this.add.sprite(0, 0, 'wall');
    // this.ready_button= this.add.sprite(halfLine,this.world.height - 30, 'ready_button');

    this.ready_button = this.add.button(halfLine, this.world.height - 30, 'ready_button', this.utils.clickOnReady, this, 0, 0, 1);
    this.parking_lot_X = this.world.width - 300 - 45
    this.parking_lot_Y = this.world.height / 2
    this.parking_lot = this.add.sprite(this.parking_lot_X, this.parking_lot_Y, 'parking_lot');
    this.parking_lot.enableBody = true
    this.physics.arcade.enable(this.parking_lot)


    this.carGroup = this.add.group()
    this.carGroup.enableBody = true

    // this.carGroup.scale.setTo(0.5,0.5)

    var stockGap = 30
    var stockGapX = 60
    var rowNum = 4
    var columnNum = Math.ceil(this.carStockCount / rowNum)
    for (var j = 0; j < columnNum; j++) {
        for (var k = 0; k < rowNum; k++) {
            if ((j + 1) * (k + 1) > this.carStockCount) {
                break
            }

            var car = this.carGroup.create(halfLine + 100 + j * stockGapX, 50 + k * stockGap, 'cop_car')
            car.inputEnabled = true;
            car.input.enableDrag();
            car.events.onDragStop.add(this.utils.onDragStop, this);
            this.carList.push(car)

        }
    }
    /*    for (var i = 0; i < this.carStockCount; i++) {
            columnNum = Math.floor(i / 4)
            var car = this.carGroup.create(halfLine + 100 + columnNum * stockGapX, 50 + i * stockGap, 'cop_car')
            car.inputEnabled = true;
            car.input.enableDrag();
            car.events.onDragStop.add(this.utils.onDragStop, this);
            this.carList.push(car)
        }
    */

    this.carGroup.inputEnableChildren = true;

    this.referenceCarGroup = this.add.group()

    var gapX = 70
    var gapY = 30
    // var xMax = 50
    // var yMax = 50
    var centerX = 30
    var centerY = 300



    var positionGrid = []
    var gridWidth = 4 
    var gridHeight = 4 

    //should handle as grid, for domino etc
    //create position grid  
    for (var i = 0; i < gridHeight; i++) {
        var row = []
        for (var j = 0; j < gridWidth; j++) {
            row[j] = null 
        }
        positionGrid[i] = row 
    }

    //calculate position grid elements' coordinates

    var GridCoordinate = {
        x: null,
        y: null
    }

    for (var i = 0; i < gridWidth; i++) {
        for (var j = 0; j < gridHeight; j++) {
            var gridCoordinate = Object.create(GridCoordinate)
            gridCoordinate.x = centerX + i * gapX
            gridCoordinate.y = centerY + j * gapY
            positionGrid[i][j] = gridCoordinate
        }
    }

    //find grid cells randomly

    var gridCellNumber = gridWidth * gridHeight

    var arr = []
    while (arr.length < this.carCount) {
        var randomnumber = Math.ceil(Math.random() * (gridCellNumber - 1))
        if (arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
    
    console.log('arr ' + arr)

    var flattenend = _.flatten(positionGrid)
    for(var i = 0; i < arr.length; i++){
       this.referenceCarGroup.create(flattenend[arr[i]].x,flattenend[arr[i]].y,'cop_car') 
    }

    // previousElement = this.referenceCarGroup.create(actualX, actualY, 'cop_car')
        //  Enable input and allow for dragging
        /*    this.car1.inputEnabled = true;
            this.car1.input.enableDrag();
            this.car2.inputEnabled = true;
            this.car2.input.enableDrag();
            // this.car1.events.onDragStart.add(this.utils.onDragStart, this);
            this.car1.events.onDragStop.add(this.utils.onDragStop, this);
            this.car2.events.onDragStop.add(this.utils.onDragStop, this);
        */

}


PracticeGame.SurveyState.prototype.utils = {

    onDragStop: function(source, pointer) {
        if (this.utils.includedIn(this.parking_lot, source)) {
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
    },

    clickOnReady: function() {
        var carsInLotCount = 0

        for (var i = 0; i < this.carList.length; i++) {
            if (this.utils.includedIn(this.parking_lot, this.carList[i])) {
                carsInLotCount++
            }
        }
        if (this.carCount == carsInLotCount) {
            console.log('equal')
        }
        console.log("cars in lot:" + carsInLotCount)

    }

}

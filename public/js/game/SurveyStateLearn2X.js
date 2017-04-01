PracticeGame.SurveyStateLearn2X = function(game) {
    // this.carStockCount = 11
    // this.parking_lot
    // this.carList = []
    // this.carCount = 4
    this.instructionText
    this.questionText
    this.magicianButton
    this.bicycleGroup
    this.bicycleNoWheelGroup
    this.bicycleWheelGroup
    this.bicycleCount = 0
    this.readyButton
    this.computeButton
    this.helpButton
    this.helpCountingTextGroup
    this.helpCountingTextGroupSetting
    this.answer = ""
    this.multiplier = 10
    this.multiplicand = 2
    this.countedClick = 0
    
    this.columnCounter = 0
    this.rowCounter = 0
    this.wheelCounter = 0

};

PracticeGame.SurveyStateLearn2X.prototype = Object.create(PracticeGameBaseState.prototype)

PracticeGame.SurveyStateLearn2X.prototype.preload = function() {

    // this.load.spritesheet('bicycle', 'assets/bicycle.png', 120, 76);
    this.load.spritesheet('bicycle', 'assets/bicycle.png', 60, 38);
    this.load.spritesheet('bicycle_no_wheel', 'assets/bicycle_no_wheel.png', 60, 38);
    this.load.spritesheet('bicycle_wheel', 'assets/bicycle_wheel.png', 23, 23);
    this.load.spritesheet('magician', 'assets/magician.png', 60, 49);
    this.load.spritesheet('cop_car', 'assets/cop-car_small.png', 60, 24);
    this.load.spritesheet('parking_lot', 'assets/parking_lot.png', 300, 150);
    this.load.spritesheet('ready_button', 'assets/ready_button_sheet.png', 45, 23);
    this.load.spritesheet('compute_button', 'assets/compute_button_sheet.png', 72, 23);
    this.load.spritesheet('help_button', 'assets/help_button_sheet.png', 72, 23);
    this.load.image('wall', 'assets/sky1.png');
}

PracticeGame.SurveyStateLearn2X.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var halfLine = this.world.width / 2
    this.wall = this.add.sprite(0, 0, 'wall');
    console.log('start')
        //add instruction text
    this.instructionText = this.game.add.text(10, 10, "Ha tudod az eredményt, írd be és nyomd meg a \"Kész\" gombot. \nHa nem, nyomd meg a \"Segíts\" gombot", {
        // this.instructionText = this.game.add.text(this.game.world.centerX, 20, "Kattints annyiszor a képre,\nahány bicikli kell a szorzáshoz!", {
        // this.instructionText = this.game.add.text(30, 30, "- Kattints annyiszor a képre, ahány bicikli kell a szorzáshoz!", {
        font: "20px Arial",
        fill: "yellow",
        align: "left"
    });
    this.instructionText.width = 680

    // this.instructionText.anchor.setTo(0.5, 0);

    this.questionText = this.game.add.text(this.world.width/2, 110, this.multiplier.toString() + " * " + this.multiplicand.toString()  + " = ", {
        font: "30px Arial",
        fill: "yellow",
        align: "center"
    });
    this.questionText.anchor.setTo(0.5, 0);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.readyButton = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, this, 0, 0, 0, 1);
    // this.computeButton = this.add.button(halfLine + 50,110, 'help_button',this.utils.helpButtonClick,this,0,0,1,0);
    this.helpButton = this.add.button(700, 60, 'help_button', this.utils.helpButtonClick, this, 0, 0, 1, 0);

    // this.ready_button = this.add.button(halfLine, this.world.height - 30, 'ready_button', this.utils.clickOnReady, this, 0, 0, 1);
    this.magicianButton = this.add.button(700, 90, 'magician', this.utils.clickOnMagician, this, 0, 0, 1);
    this.magicianButton.visible = false
        // this.bicyleOnClick= this.add.button(halfLine - 60, 90, 'ready_button', this.utils.calculate, this, 0, 0, 1);


    // this.computeButton = this.add.button(halfLine - 60, 190, 'compute_button', this.utils.computeButtonClick, this, 0, 0, 1);
    // this.computeButton.visible = false

    this.bicycleGroup = this.add.group()

    // this.bicycleGroup.scale.setTo(0.5,0.5)
    // this.game.physics.arcade.enable(this.bicycleGroup);
    // this.bicycleGroup.enableBody = true

    this.bicycleNoWheelGroup = this.add.group()
        // this.bicycleNoWheelGroup.scale.setTo(0.5,0.5)
    this.bicycleWheelGroup = this.add.group()
        // this.bicycleWheelGroup.scale.setTo(0.5,0.5)
    this.helpCountingTextGroup = this.add.group()
    this.helpCountingTextGroupSetting = {
        font: "25px Arial",
        fill: "yellow",
        align: "left"
    }

    this.input.keyboard.addCallbacks(this, null, null, this.utils.keyPress);

    // this.bicyleOnClick.setTo(0.5,0)
    // this.parking_lot_X = this.world.width - 300 - 45
    // this.parking_lot_Y = this.world.height / 2
    // this.parking_lot = this.add.sprite(this.parking_lot_X, this.parking_lot_Y, 'parking_lot');
    // this.parking_lot.enableBody = true
    // this.physics.arcade.enable(this.parking_lot)


    // this.carGroup = this.add.group()
    // this.carGroup.enableBody = true

    // // this.carGroup.scale.setTo(0.5,0.5)

    // var stockGap = 30
    // var stockGapX = 60
    // var rowNum = 4
    // var columnNum = Math.ceil(this.carStockCount / rowNum)
    // for (var j = 0; j < columnNum; j++) {
    //     for (var k = 0; k < rowNum; k++) {
    //         if ((j + 1) * (k + 1) > this.carStockCount) {
    //             break
    //         }

    //         var car = this.carGroup.create(halfLine + 100 + j * stockGapX, 50 + k * stockGap, 'cop_car')
    //         car.inputEnabled = true;
    //         car.input.enableDrag();
    //         car.events.onDragStop.add(this.utils.onDragStop, this);
    //         this.carList.push(car)

    //     }
    // }
    // /*    for (var i = 0; i < this.carStockCount; i++) {
    //         columnNum = Math.floor(i / 4)
    //         var car = this.carGroup.create(halfLine + 100 + columnNum * stockGapX, 50 + i * stockGap, 'cop_car')
    //         car.inputEnabled = true;
    //         car.input.enableDrag();
    //         car.events.onDragStop.add(this.utils.onDragStop, this);
    //         this.carList.push(car)
    //     }
    // */

    // this.carGroup.inputEnableChildren = true;

    // this.referenceCarGroup = this.add.group()

    // var gapX = 70
    // var gapY = 30
    // // var xMax = 50
    // // var yMax = 50
    // var centerX = 30
    // var centerY = 300



    // var positionGrid = []
    // var gridWidth = 4 
    // var gridHeight = 4 

    // //should handle as grid, for domino etc
    // //create position grid  
    // for (var i = 0; i < gridHeight; i++) {
    //     var row = []
    //     for (var j = 0; j < gridWidth; j++) {
    //         row[j] = null 
    //     }
    //     positionGrid[i] = row 
    // }

    // //calculate position grid elements' coordinates

    // var GridCoordinate = {
    //     x: null,
    //     y: null
    // }

    // for (var i = 0; i < gridWidth; i++) {
    //     for (var j = 0; j < gridHeight; j++) {
    //         var gridCoordinate = Object.create(GridCoordinate)
    //         gridCoordinate.x = centerX + i * gapX
    //         gridCoordinate.y = centerY + j * gapY
    //         positionGrid[i][j] = gridCoordinate
    //     }
    // }

    // //find grid cells randomly

    // var gridCellNumber = gridWidth * gridHeight

    // var arr = []
    // while (arr.length < this.carCount) {
    //     var randomnumber = Math.ceil(Math.random() * (gridCellNumber - 1))
    //     if (arr.indexOf(randomnumber) > -1) continue;
    //     arr[arr.length] = randomnumber;
    // }

    // console.log('arr ' + arr)

    // var flattenend = _.flatten(positionGrid)
    // for(var i = 0; i < arr.length; i++){
    //   this.referenceCarGroup.create(flattenend[arr[i]].x,flattenend[arr[i]].y,'cop_car') 
    // }

    // // previousElement = this.referenceCarGroup.create(actualX, actualY, 'cop_car')
    //     //  Enable input and allow for dragging
    //     /*    this.car1.inputEnabled = true;
    //         this.car1.input.enableDrag();
    //         this.car2.inputEnabled = true;
    //         this.car2.input.enableDrag();
    //         // this.car1.events.onDragStart.add(this.utils.onDragStart, this);
    //         this.car1.events.onDragStop.add(this.utils.onDragStop, this);
    //         this.car2.events.onDragStop.add(this.utils.onDragStop, this);
    //     */

}


PracticeGame.SurveyStateLearn2X.prototype.utils = {

    // onDragStop: function(source, pointer) {
    //     if (this.utils.includedIn(this.parking_lot, source)) {
    //         console.log('ok in it')
    //     }

    // },

    // includedIn: function(includer, spriteOnCheck) {
    //     if (spriteOnCheck.position.x > includer.position.x && spriteOnCheck.position.x < (includer.position.x + includer.body.width) &&
    //         spriteOnCheck.position.y > includer.position.y && (spriteOnCheck.position.y < includer.position.y + includer.body.height)) {
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // },

    // clickOnReady: function() {
    //     var carsInLotCount = 0

    //     for (var i = 0; i < this.carList.length; i++) {
    //         if (this.utils.includedIn(this.parking_lot, this.carList[i])) {
    //             carsInLotCount++
    //         }
    //     }
    //     if (this.carCount == carsInLotCount) {
    //         console.log('equal')
    //     }
    //     console.log("cars in lot:" + carsInLotCount)

    // },

    clickOnMagician: function() {
        if (this.bicycleCount < this.multiplier) {
            // var bicycleLineNum = 0
            // var computerImageXCount = 0
            // if(this.bicycleCount >= 5){
            // //   bicycleLineNum = 1 
            // //   computerImageXCount = 5 
            // }
            var bicycle = this.bicycleGroup.create(this.bicycleCount * 68, 150, 'bicycle')
            bicycle.events.onInputDown.add(this.utils.clickOnBicycle, this);
            bicycle.inputEnabled = true;

            var bicycleNoWheel = this.bicycleNoWheelGroup.create(this.bicycleCount * 68, 150, 'bicycle_no_wheel')
            bicycleNoWheel.visible = false
            
            this.bicycleCount++
        }



        if (this.bicycleCount == this.multiplier) {
            this.instructionText.setText("Ha segítség kell a számoláshoz, kattints a biciklikre.")
            this.magicianButton.destroy()
            this.helpButton.destroy()
            this.readyButton.destroy()
            // this.computeButton.visible = true
        }
    },

    // calculate: function(){
    //     this.questionText.setText('5 * 2 = 10')
    // },

    helpButtonClick: function() {
        this.magicianButton.visible = true
        this.instructionText.setText("Kattints " + this.multiplier.toString() + "-ször a bűvész cilinderére és kapsz " + this.multiplier.toString() + " biciklit.\n Ha megszámolod a kerekeket, megkapod az eredményt.")
        this.helpButton.destroy()

    },

    clickOnBicycle: function(source) {
        console.log('cob' + source)
        source.inputEnabled = false
        //compute grid with 10 rows and 10 columns
        var rowHeight = 34 + 5
        var columnWidth = 68
            //top left corner of the grid
        var gridTopLeftCornerX = 15
        var gridTopLeftCornerY = 150 + rowHeight + 20
        var bottomBorder = 5
        var counterTextLeftCornerX = 681
        source.visible = false
        var index = _.indexOf(this.bicycleGroup.children,source)
        this.bicycleNoWheelGroup.children[index].visible = true



        this.countedClick++
            var i = this.countedClick

        // for (var i = 1; i <= this.bicycleCount * this.multiplicand;) {
        for (var i = 1; i <=  this.multiplicand;i++) {
            var rowY = gridTopLeftCornerY + this.rowCounter * rowHeight
            var bicycleWheel = this.bicycleWheelGroup.create(gridTopLeftCornerX + this.columnCounter * columnWidth, rowY, 'bicycle_wheel')
            this.columnCounter++
            this.wheelCounter++
            if (this.wheelCounter == 10 || this.wheelCounter == 20 || this.wheelCounter == 30 || this.wheelCounter == 40 || this.wheelCounter == 50 || this.wheelCounter == 60
            || this.wheelCounter == 70 || this.wheelCounter == 80 || this.wheelCounter == 90) {
                var counterText = this.game.add.text(counterTextLeftCornerX, rowY, (this.wheelCounter / 10 * this.columnCounter).toString(), this.helpCountingTextGroupSetting)
                this.rowCounter++
                this.columnCounter = 0
            }
            else if (this.bicycleCount * this.multiplicand == this.wheelCounter) {
                var counterText = this.game.add.text(counterTextLeftCornerX, rowY, this.columnCounter.toString(), this.helpCountingTextGroupSetting)
        this.instructionText.width = 680
        this.instructionText.font = "15px Arial"
        this.instructionText.setText("Most már könnyű megszámolni. \n Írd be az eredményt, \n azután nyomd meg a \"Kész\" gombot!")

            }

        }


        // this.bicycleGroup.destroy()
        // var halfLine = this.world.width / 2
        // for( var i = 0 ; i < this.bicycleCount; i++) {
        //     var bicycleLineNum = 0
        //     var computerImageXCount = 0
        //     if(i >= 5){
        // //   bicycleLineNum = 1 
        // //   computerImageXCount = 5 
        //     }
        //   var bicycle = this.bicycleNoWheelGroup.create((i - computerImageXCount) * 60, 300 + 90 * bicycleLineNum, 'bicycle_no_wheel')
        // }

        // for(var i = 0; i < this.bicycleCount * 2; i++){
        //     var bicycleLineNum = 0
        //     var computerImageXCount = 0
        //     if(i >= 10){
        //   bicycleLineNum = 1 
        //   computerImageXCount = 10
        //     }
        //   var bicycleWheel = this.bicycleWheelGroup.create((i - computerImageXCount)  * 45, 500 + 50 * bicycleLineNum, 'bicycle_wheel')
        // }

        // this.add.text(400,300,"10",this.helpCountingTextGroupSetting)
        // this.add.text(400,350,"20",this.helpCountingTextGroupSetting)
        // this.instructionText.setText("Most már könnyű megszámolni. Írd be az eredményt, azután nyomd meg a \"Kész\" gombot!")
        // this.instructionText.width = 680
        // this.readyButton = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, 0, 0, 1);
    this.readyButton = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, this, 0, 0, 0, 1);
        // this.computeButton.destroy()

    },

    keyPress: function(char) {
        this.answer = this.answer + char
        console.log(this.answer)
        this.questionText.setText(this.multiplier.toString() + " * " + this.multiplicand.toString() +  " = " + this.answer)
    },

    readyButtonClick: function() {
        if (this.answer == (this.multiplier * this.multiplicand).toString()) {
            this.instructionText.setText("Ügyes vagy, ez a helyes válasz!")
        }
    }


}



PracticeGame.SurveyStateLearn2X.prototype.render = function() {
    // console.log('render')
    // this.game.debug.text('hoppa' + this.instructionText.text,20,20,'yellow')
    // this.game.debug.body(this.bicycleGroup.children[0],20,20,'yellow')
    if (this.bicycleGroup.children.length > 1 && this.bicycleGroup.children[1].body != null) {

        this.game.debug.body(this.bicycleGroup.children[1])
    }
}

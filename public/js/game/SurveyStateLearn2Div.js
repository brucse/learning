PracticeGame.SurveyStateLearn2Div = function(game) {
    // this.carStockCount = 11
    // this.parking_lot
    // this.carList = []
    // this.carCount = 4
    this.instructionText
    this.questionText
    this.magicianButton
    this.controlOfficerButton
        // this.bicycleGroup
    this.aircraftGroup
    this.aircraftLandGroup
    this.aircraftCount = 0
        // this.bicycleNoWheelGroup
        // this.bicycleWheelGroup
        // this.bicycleCount = 0
    this.readyButton
    this.computeButton
    this.helpButton
    this.helpCountingTextGroup
    this.helpCountingTextGroupSetting
    this.answer = ""
        // this.multiplier = 0
    this.dividend = 0
        // this.multiplicand = 2
    this.divider = 2
    this.countedClick = 0
    this.clearButton

    this.columnCounter = 0
    this.rowCounter = 0
    this.wheelCounter = 0

    this.columnCounterLand = 0
    this.rowCounterLand = 0

    this.affixMatrix = {
        1: "szer",
        2: "szer",
        3: "szor",
        4: "szer",
        5: "ször",
        6: "szor",
        7: "szer",
        8: "szor",
        9: "szer",
        10: "szer"
    }

};

PracticeGame.SurveyStateLearn2Div.prototype = Object.create(PracticeGameBaseState.prototype)


PracticeGame.SurveyStateLearn2Div.prototype.init = function(surveyCount) {
    // this.multiplier = surveyCount
    this.dividend = this.divider * surveyCount
    this.answer = ""
    this.bicycleCount = 0
    this.countedClick = 0
    this.columnCounter = 0
    this.rowCounter = 0
    this.wheelCounter = 0

    this.columnCounterLand = 0
    this.rowCounterLand = 0
}

PracticeGame.SurveyStateLearn2Div.prototype.preload = function() {

    // this.load.spritesheet('bicycle', 'assets/bicycle.png', 120, 76);
    // this.load.spritesheet('F16', 'assets/F16.png', 50, 30);
    this.load.spritesheet('F16', 'assets/F162.png', 25, 15);
    this.load.spritesheet('aircraf_land', 'assets/aircraft_land.png', 140, 115);
    this.load.spritesheet('bicycle_no_wheel', 'assets/bicycle_no_wheel.png', 60, 38);
    this.load.spritesheet('bicycle_wheel', 'assets/bicycle_wheel.png', 23, 23);
    this.load.spritesheet('magician', 'assets/magician.png', 60, 49);
    this.load.spritesheet('control_officer', 'assets/control_officer.png', 60, 60);
    this.load.spritesheet('cop_car', 'assets/cop-car_small.png', 60, 24);
    this.load.spritesheet('parking_lot', 'assets/parking_lot.png', 300, 150);
    this.load.spritesheet('ready_button', 'assets/ready_button_sheet.png', 45, 23);
    this.load.spritesheet('compute_button', 'assets/compute_button_sheet.png', 72, 23);
    this.load.spritesheet('help_button', 'assets/help_button_sheet.png', 72, 23);
    this.load.spritesheet('clear_button', 'assets/clear_button_sheet.png', 72, 23);
    this.load.spritesheet('backtogame_button', 'assets/backtogame_button_sheet.png', 72, 23);
    this.load.image('wall', 'assets/sky1.png');
}

PracticeGame.SurveyStateLearn2Div.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var halfLine = this.world.width / 2
    this.wall = this.add.sprite(0, 0, 'wall');
    //add instruction text
    this.instructionText = this.game.add.text(10, 10, "Ha tudod az eredményt, írd be és nyomd meg a \"Kész\" gombot. \nHa nem, nyomd meg a \"Segíts\" gombot \n Ha elrontottad az eredményt, használd a \"TÖRÖL\" gombot.", {
        // this.instructionText = this.game.add.text(this.game.world.centerX, 20, "Kattints annyiszor a képre,\nahány bicikli kell a szorzáshoz!", {
        // this.instructionText = this.game.add.text(30, 30, "- Kattints annyiszor a képre, ahány bicikli kell a szorzáshoz!", {
        font: "20px Arial",
        fill: "yellow",
        align: "left"
    });
    this.instructionText.width = 680

    // this.instructionText.anchor.setTo(0.5, 0);

    this.questionText = this.game.add.text(this.world.width / 2, 110, this.dividend.toString() + " : " + this.divider.toString() + " = ", {
        font: "30px Arial",
        fill: "yellow",
        align: "center"
    });
    this.questionText.anchor.setTo(0.5, 0);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.readyButtn = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, this, 0, 0, 0, 1);
    this.helpButton = this.add.button(700, 60, 'help_button', this.utils.helpButtonClick, this, 0, 0, 1, 0);

    this.magicianButton = this.add.button(700, 60, 'magician', this.utils.clickOnMagician, this, 0, 0, 1);
    this.magicianButton.visible = false

    this.controlOfficerButton = this.add.button(700, 60, 'control_officer', this.utils.clickOnControlOfficer, this, 0, 0, 1);
    this.controlOfficerButton.visible = false

    this.clearButton = this.add.button(700, 110, 'clear_button', this.utils.clearButtonClick, this, 0, 0, 1);


    this.aircraftLandGroup = this.add.group()
    this.aircraftGroup = this.add.group()



    this.helpCountingTextGroup = this.add.group()
    this.helpCountingTextGroupSetting = {
        font: "12px Arial",
        fill: "yellow",
        align: "left"
    }

    this.input.keyboard.addCallbacks(this, null, null, this.utils.keyPress);

}


PracticeGame.SurveyStateLearn2Div.prototype.utils = {


    clickOnMagician: function() {

        var rowHeight = 15
        var columnWidth = 50 + 5
            //top left corner of the grid
        var gridTopLeftCornerX = 15
        var gridTopLeftCornerY = 150
        var bottomBorder = 5
        var counterTextLeftCornerX = 681

        for (var i = 1; i <= this.dividend; i++) {
            var rowY = gridTopLeftCornerY + this.rowCounter * rowHeight
            var aircraft = this.aircraftGroup.create(gridTopLeftCornerX + this.columnCounter * columnWidth, rowY, 'F16')
            this.columnCounter++
                this.aircraftCount++
                if (this.aircraftCount == 10 || this.aircraftCount == 20 || this.aircraftCount == 30 || this.aircraftCount == 40 || this.aircraftCount == 50 || this.aircraftCount == 60 ||
                    this.aircraftCount == 70 || this.aircraftCount == 80 || this.aircraftCount == 90) {
                    var counterText = this.game.add.text(counterTextLeftCornerX, rowY, (this.aircraftCount / 10 * this.columnCounter).toString(), this.helpCountingTextGroupSetting)
                        // counterText.font = "4px Arial"
                    this.rowCounter++
                        this.columnCounter = 0
                }
                else
            if (this.dividend == this.aircraftCount) {
                var counterText = this.game.add.text(counterTextLeftCornerX, rowY, this.columnCounter.toString(), this.helpCountingTextGroupSetting)
                    // counterText.font = "4px Arial"
                this.instructionText.width = 680
                this.instructionText.font = "15px Arial"
                    // this.instructionText.setText("Most már könnyű megszámolni. \n Írd be az eredményt, \n azután nyomd meg a \"Kész\" gombot!")
                this.instructionText.setText("Kattints a repülés irányítóra és \nminden leszállópályára ugyanannyi gép fog leszállni " +
                    "\nSzámold meg, egy pályán hány gép van és megkapod \naz eredményt")
                this.magicianButton.destroy()
                this.controlOfficerButton.visible = true

            }

        }


        var rowHeightLand = 140
        var columnWidthLand = 154
            //top left corner of the grid
        var gridTopLeftCornerLandX = 15
        var gridTopLeftCornerLandY = 325
        
        for (var i = 1; i <= this.divider; i++) {
            if(this.columnCounterLand == 5){
                this.rowCounterLand++
                this.columnCounterLand = 0
            }
            var rowY = gridTopLeftCornerLandY + this.rowCounterLand * rowHeightLand
            var aircraft = this.aircraftLandGroup.create(gridTopLeftCornerLandX + this.columnCounterLand * columnWidthLand, rowY, 'aircraf_land')
            this.columnCounterLand++

        }



        /*        if (this.aircraftCount < this.dividend) {
                    // var bicycleLineNum = 0
                    // var computerImageXCount = 0
                    // if(this.bicycleCount >= 5){
                    // //   bicycleLineNum = 1 
                    // //   computerImageXCount = 5 
                    // }
                    // var bicycle = this.bicycleGroup.create(this.bicycleCount * 68, 150, 'bicycle')

                    var aircraft = this.aircraftGroup.create(this.aircraftCount * 50, 150, 'bicycle')

                    this.aircraftCount++
                }

        */

        // if (this.bicycleCount == this.multiplier) {
        //     this.instructionText.setText("Ha segítség kell a számoláshoz, kattints a biciklikre.")
        //     this.magicianButton.destroy()
        //     this.helpButton.destroy()
        //         // this.readyButton.destroy()
        //         // this.computeButton.visible = true
        // }
    },

    // calculate: function(){
    //     this.questionText.setText('5 * 2 = 10')
    // },

    helpButtonClick: function() {
        this.questionText.fill = "yellow"
        this.magicianButton.visible = true
            // this.instructionText.setText("Kattints " + this.multiplier.toString() + "-" + this.affixMatrix[this.multiplier] + " a bűvész cilinderére és kapsz " + this.multiplier.toString() + " biciklit.\n Ha megszámolod a kerekeket, megkapod az eredményt.")
        this.instructionText.setText("Kattints  a bűvész cilinderére. Kapsz " + this.dividend.toString() + " repülőt,\n és " + this.divider.toString() + " leszállópályát" +
            "\n ");
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
        var index = _.indexOf(this.bicycleGroup.children, source)
        this.bicycleNoWheelGroup.children[index].visible = true



        this.countedClick++
            var i = this.countedClick

        // for (var i = 1; i <= this.bicycleCount * this.multiplicand;) {
        // for (var i = 1; i <= this.multiplicand; i++) {
        for (var i = 1; i <= 100; i++) {
            var rowY = gridTopLeftCornerY + this.rowCounter * rowHeight
            var bicycleWheel = this.bicycleWheelGroup.create(gridTopLeftCornerX + this.columnCounter * columnWidth, rowY, 'bicycle_wheel')
            this.columnCounter++
                this.aircrAftcount++
                if (this.aircrAftcount == 10 || this.aircrAftcount == 20 || this.aircrAftcount == 30 || this.aircrAftcount == 40 || this.aircrAftcount == 50 || this.aircrAftcount == 60 ||
                    this.aircrAftcount == 70 || this.aircrAftcount == 80 || this.aircrAftcount == 90) {
                    var counterText = this.game.add.text(counterTextLeftCornerX, rowY, (this.aircrAftcount / 10 * this.columnCounter).toString(), this.helpCountingTextGroupSetting)
                    this.rowCounter++
                        this.columnCounter = 0
                }
                else
            if (this.bicycleCount * this.multiplicand == this.aircrAftcount) {
                var counterText = this.game.add.text(counterTextLeftCornerX, rowY, this.columnCounter.toString(), this.helpCountingTextGroupSetting)
                this.instructionText.width = 680
                this.instructionText.font = "15px Arial"
                this.instructionText.setText("Most már könnyű megszámolni. \n Írd be az eredményt, \n azután nyomd meg a \"Kész\" gombot!")

            }

        }


        this.readyButton = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, this, 0, 0, 0, 1);

    },

    keyPress: function(char) {
        this.questionText.fill = "yellow"
        this.answer = this.answer + char
        console.log(this.answer)
        this.questionText.setText(this.multiplier.toString() + " * " + this.multiplicand.toString() + " = " + this.answer)
    },

    readyButtonClick: function() {
        if (this.answer == (this.multiplier * this.multiplicand).toString()) {
            this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
            this.helpButton.destroy()
            this.clearButton.destroy()
                // this.readyButton.destroy()

            this.add.button(700, 10, 'backtogame_button', function() {
                //@todo this.multiplier separate to round counting 
                this.game.state.start('ShootingState', true, false, 1, true);
            }, this, 0, 0, 0, 1);
        }
        else {
            this.questionText.fill = "red"
            this.instructionText.setText("Ez nem a helyes eredmény, próbáld újra")
        }
    },

    clearButtonClick: function() {
        this.answer = ""
        this.questionText.setText(this.multiplier.toString() + " * " + this.multiplicand.toString() + " = " + this.answer)
        this.questionText.fill = "yellow"
    },

    clickOnControlOfficer: function() {
        var aircraftGroup = this.aircraftGroup
        var aircraftNum = this.dividend / this.divider
        var aircraftLandedCount = 0
        var game = this
        var columnWidth = 28
        var rowHeight = 60
        var rowOffset = 5
        var rowNum = 0
        var columnNum = 0
        this.aircraftLandGroup.forEach(function (item){
            columnNum = 0
            rowNum = 0
          for(var i = 1; i <= aircraftNum;i++) {
              if(i == 6 ){
                   rowNum = 1
                   columnNum = 0
              }
                  
              var child =aircraftGroup.children[aircraftLandedCount] 
              child.position.x = item.position.x +  columnNum * columnWidth
              child.position.y = item.position.y + rowNum * rowHeight  + rowHeight /2 - columnNum * rowOffset
              columnNum++
              aircraftLandedCount++
          }
        })
    }





}



PracticeGame.SurveyStateLearn2Div.prototype.render = function() {
    // console.log('render')
    // this.game.debug.text('hoppa' + this.instructionText.text,20,20,'yellow')
    // this.game.debug.body(this.bicycleGroup.children[0],20,20,'yellow')
    // if (this.bicycleGroup.children.length > 1 && this.bicycleGroup.children[1].body != null) {

    //     this.game.debug.body(this.bicycleGroup.children[1])
    // }
}

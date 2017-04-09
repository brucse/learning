PracticeGame.SurveyStateLearn2X = function(game) {
    // this.carStockCount = 11
    // this.parking_lot
    // this.carList = []
    this.wrongBicylceCountText // this.carCount = 4


    this.instructionText
        // this.questionText
    this.actualQuestionTextIndex
    this.questionTextArray = []
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
    this.multiplier = 0
    this.multiplicand = 2
    this.countedClick = 0
    this.clearButton

    this.columnCounter = 0
    this.rowCounter = 0
    this.wheelCounter = 0
        // this.surveyType

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

    // this.multiplierArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    this.multiplierArrayShuffled
    this.isArraySet = false

    this.onWorkStyle = {
        fill: 'yellow',
        backgroundColor: '#5f5f5f'
    }

    this.errorStyle = {
        fill: 'red',
        backgroundColor: '#5f5f5f'
    }
    this.readyStyle = {
        fill: 'yellow',
        backgroundColor: null
    }

};

PracticeGame.SurveyStateLearn2X.prototype = Object.create(PracticeGameBaseState.prototype)




// PracticeGame.SurveyStateLearn2X.prototype.init = function(surveyCount, surveyType) {
PracticeGame.SurveyStateLearn2X.prototype.init = function(surveyCount) {

    if (this.surveyType == 'mult2part1rnd') {
        if (!this.isArraySet) {
            this.multiplierArrayShuffled = _.shuffle([1, 2, 3, 4, 5])
            this.isArraySet = true
        }
    }
    else if (this.surveyType == 'mult2part1') {
        this.multiplierArrayShuffled = [1, 2, 3, 4, 5]
        this.isArraySet = true
    }
    else if (this.surveyType == 'mult2part2rnd') {
        if (!this.isArraySet) {
            this.multiplierArrayShuffled = _.shuffle([6, 7, 8, 9, 10])
            this.isArraySet = true
        }
    }
    else if (this.surveyType == 'mult2part2') {
        this.multiplierArrayShuffled = [6, 7, 8, 9, 10]
        this.isArraySet = true
    }


    this.multiplier = this.multiplierArrayShuffled[surveyCount - 1]
    this.answer = ""
    this.bicycleCount = 0
    this.countedClick = 0
    this.columnCounter = 0
    this.rowCounter = 0
    this.wheelCounter = 0
    this.questionTextArray = []
        // this.surveyType = surveyType
        // this.game.paused = false
}

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
    this.load.spritesheet('clear_button', 'assets/clear_button_sheet.png', 72, 23);
    this.load.spritesheet('backtogame_button', 'assets/backtogame_button_sheet.png', 72, 23);
    this.load.image('wall', 'assets/sky1.png');
}

PracticeGame.SurveyStateLearn2X.prototype.create = function() {

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var halfLine = this.world.width / 2
    this.wall = this.add.sprite(0, 0, 'wall');
    console.log('start')
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

    var questionTextHeight = 35

    if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part2') {

        for (var i = 0; i < this.multiplierArrayShuffled.length; i++) {
            var text
            text = this.game.add.text(this.world.width / 2, 110 + i * questionTextHeight, this.multiplierArrayShuffled[i].toString() + " * " + this.multiplicand.toString() + " = ", {
                font: "30px Arial",
                fill: "yellow",
                align: "center"
                    // backgroundColor : 'yellow'
            });

            text.anchor.setTo(0.5, 0);
            this.questionTextArray.push(text)

            // text.backgroundColor = 'yellow'
        }
        this.actualQuestionTextIndex = 0
        this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.onWorkStyle)

    }
    else {
        this.questionText = this.game.add.text(this.world.width / 2, 110, this.multiplier.toString() + " * " + this.multiplicand.toString() + " = ", {
            font: "30px Arial",
            fill: "yellow",
            align: "center"
        });
    }

    // this.questionText = this.game.add.text(this.world.width / 2, 110, this.multiplier.toString() + " * " + this.multiplicand.toString() + " = ", {
    //     font: "30px Arial",
    //     fill: "yellow",
    //     align: "center"
    // });
    // this.questionText.anchor.setTo(0.5, 0);

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.readyButton = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, this, 0, 0, 0, 1);
    // this.computeButton = this.add.button(halfLine + 50,110, 'help_button',this.utils.helpButtonClick,this,0,0,1,0);
    this.helpButton = this.add.button(700, 60, 'help_button', this.utils.helpButtonClick, this, 0, 0, 1, 0);

    // this.ready_button = this.add.button(halfLine, this.world.height - 30, 'ready_button', this.utils.clickOnReady, this, 0, 0, 1);
    this.magicianButton = this.add.button(700, 60, 'magician', this.utils.clickOnMagician, this, 0, 0, 1);
    this.magicianButton.visible = false
        // this.bicyleOnClick= this.add.button(halfLine - 60, 90, 'ready_button', this.utils.calculate, this, 0, 0, 1);

    this.clearButton = this.add.button(700, 110, 'clear_button', this.utils.clearButtonClick, this, 0, 0, 1);

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
    this.wheelGroup

    this.helpCountingTextGroup = this.add.group()
    this.helpCountingTextGroupSetting = {
        font: "25px Arial",
        fill: "yellow",
        align: "left"
    }

    this.input.keyboard.addCallbacks(this, null, null, this.utils.keyPress);

}


PracticeGame.SurveyStateLearn2X.prototype.utils = {


    clickOnMagician: function() {
        // if (this.bicycleCount < this.multiplierArrayShuffled[this.actualQuestionTextIndex]) {
        this.instructionText.setText("Ha segítség kell a számoláshoz, kattints a biciklikre.")
        this.helpButton.visible = false
        if (this.bicycleCount < 10) {
            // var bicycleLineNum = 0
            // var computerImageXCount = 0
            // if(this.bicycleCount >= 5){
            // //   bicycleLineNum = 1 
            // //   computerImageXCount = 5 
            // }
            var bicycle = this.bicycleGroup.create(this.bicycleCount * 68, 290, 'bicycle')
            bicycle.events.onInputDown.add(this.utils.clickOnBicycle, this);
            bicycle.inputEnabled = true;

            var bicycleNoWheel = this.bicycleNoWheelGroup.create(this.bicycleCount * 68, 290, 'bicycle_no_wheel')
            bicycleNoWheel.visible = true

            this.bicycleCount++
        }



        if (this.bicycleCount == this.multiplierArrayShuffled[this.actualQuestionTextIndex]) {
            // this.magicianButton.destroy()
            // this.readyButton.destroy()
            // this.computeButton.visible = true
        }
    },

    // calculate: function(){
    //     this.questionText.setText('5 * 2 = 10')
    // },

    helpButtonClick: function() {
        // this.questionText.fill = "yellow"
        this.helpButton.visible = false
        this.magicianButton.visible = true
        this.instructionText.setText("Kattints " + this.multiplier.toString() + "-" + this.affixMatrix[this.multiplier] + " a bűvész cilinderére és kapsz " + this.multiplier.toString() + " biciklit.\n Ha megszámolod a kerekeket, megkapod az eredményt.")
    },

    clickOnBicycle: function(source) {
        console.log('cob' + source)
        this.magicianButton.visible = false
        var localMultiplier
        if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part2') {
            localMultiplier = this.multiplierArrayShuffled[this.actualQuestionTextIndex]
        }
        else {
            localMultiplier = this.multiplier
        }


        if (this.bicycleCount != localMultiplier) {
            this.wrongBicylceCountText = this.game.add.text(10, source.position.y + 30, "Nem ennyi biciklire van szükseged, \nnézd meg mennyivel kell szorozni a " + this.multiplicand + "-t")
            this.wrongBicylceCountText.fill = 'red'
            while (this.bicycleGroup.length > 0) {
                this.bicycleGroup.children.pop().destroy()
            }

            while (this.bicycleNoWheelGroup.length > 0) {
                this.bicycleNoWheelGroup.children.pop().destroy()
            }
            this.magicianButton.visible = false
        }
        else {

            source.inputEnabled = false
                //compute grid with 10 rows and 10 columns
            var rowHeight = 34 + 5
            var columnWidth = 68
                //top left corner of the grid
            var gridTopLeftCornerX = 15
            var gridTopLeftCornerY = 360 + rowHeight + 20
            var bottomBorder = 5
            var counterTextLeftCornerX = 681
            source.visible = false
            var index = _.indexOf(this.bicycleGroup.children, source)
            this.bicycleNoWheelGroup.children[index].visible = true



            this.countedClick++
                var i = this.countedClick

            // for (var i = 1; i <= this.bicycleCount * this.multiplicand;) {
            // for (var i = 1; i <= this.multiplicand; i++) {
            var counterText
            for (var i = 1; i <= this.multiplicand; i++) {
                var rowY = gridTopLeftCornerY + this.rowCounter * rowHeight
                var bicycleWheel = this.bicycleWheelGroup.create(gridTopLeftCornerX + this.columnCounter * columnWidth, rowY, 'bicycle_wheel')
                this.columnCounter++
                    this.wheelCounter++
                    if (this.wheelCounter == 10 || this.wheelCounter == 20 || this.wheelCounter == 30 || this.wheelCounter == 40 || this.wheelCounter == 50 || this.wheelCounter == 60 ||
                        this.wheelCounter == 70 || this.wheelCounter == 80 || this.wheelCounter == 90) {
                        counterText = this.game.add.text(counterTextLeftCornerX, rowY, (this.wheelCounter / 10 * this.columnCounter).toString(), this.helpCountingTextGroupSetting, this.helpCountingTextGroup)
                        this.rowCounter++
                            this.columnCounter = 0
                    }
                    // else
                if (this.bicycleCount * this.multiplicand == this.wheelCounter) {
                    // var counterText = this.game.add.text(counterTextLeftCornerX, rowY, this.columnCounter.toString(), this.helpCountingTextGroupSetting,this.helpCountingTextGroup)
                    if (counterText != null) counterText.destroy()
                    this.instructionText.width = 680
                    this.instructionText.font = "15px Arial"
                    this.instructionText.setText("Most már könnyű megszámolni. \n Írd be az eredményt, \n azután nyomd meg a \"Kész\" gombot!")

                }

            }

        }

        // this.readyButton = this.add.button(700, 10, 'ready_button', this.utils.readyButtonClick, this, 0, 0, 0, 1);

    },

    keyPress: function(char) {
        // this.questionText.fill = "yellow"
        this.answer = this.answer + char
        if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part2') {
            var actualText = this.questionTextArray[this.actualQuestionTextIndex].text.split('=')[0]
            this.questionTextArray[this.actualQuestionTextIndex].setText(actualText + '= ' + this.answer)
        }
        else {
            var actualText = this.questionText.text.split('=')[0]
            this.questionText.setText(actualText + '= ' + this.answer)
        }
    },

    readyButtonClick: function() {
        this.instructionText.setText('')
        this.helpButton.visible = true
        this.magicianButton.visible = false
            // this.bicycleNoWheelGroup.destroy()
            // this.bicycleNoWheelGroup.children.forEach(function(item){
            //   item.destroy() 
            // })
        while (this.bicycleNoWheelGroup.length > 0) {
            this.bicycleNoWheelGroup.children.pop().destroy()
        }
        // this.bicycleGroup.children.forEach(function(item){
        //   item.destroy() 
        // })
        while (this.bicycleGroup.length > 0) {
            this.bicycleGroup.children.pop().destroy()
        }
        // this.bicycleWheelGroup.children.forEach(function(item){
        //   item.destroy() 
        // })
        while (this.bicycleWheelGroup.length > 0) {
            this.bicycleWheelGroup.children.pop().destroy()
        }
        // for(var i = 0; i < l; i++){
        //   this.bicycleWheelGroup.children[i].destroy() 
        //   console.log(i)
        // }
        // this.helpCountingTextGroup.children.forEach(function(item){
        //   item.destroy() 
        // })
        while (this.helpCountingTextGroup.children.length > 0) {
            this.helpCountingTextGroup.children.pop().destroy()
        }

        this.bicycleCount = 0
        this.columnCounter = 0
        this.wheelCounter = 0


        if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part2') {
            if (this.actualQuestionTextIndex <= this.multiplierArrayShuffled.length - 1) {
                // if (this.answer == (this.multiplier * this.multiplicand).toString()) {
                if (this.answer == (this.multiplicand * this.multiplierArrayShuffled[this.actualQuestionTextIndex]).toString()) {
                    // this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
                    this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.readyStyle)
                    if (this.actualQuestionTextIndex != this.multiplierArrayShuffled.length - 1) {
                        this.actualQuestionTextIndex++
                            this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.onWorkStyle)
                    }
                    else {
                        this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
                        this.helpButton.destroy()
                        this.clearButton.destroy()
                        this.readyButton.destroy()
                        this.add.button(700, 10, 'backtogame_button', function() {
                            //@todo this.multiplier separate to round counting 
                            this.game.state.start('ShootingState', true, false, 1, true, false, this.surveyType);
                        }, this, 0, 0, 0, 1);

                        //all questions answered well

                    }
                    // this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
                    // this.helpButton.destroy()
                    // this.clearButton.destroy()
                    // this.readyButton.destroy()

                    // this.add.button(700, 10, 'backtogame_button', function() {
                    //     //@todo this.multiplier separate to round counting 
                    //     this.game.state.start('ShootingState', true, false, 1, true, false, this.surveyType);
                    // }, this, 0, 0, 0, 1);
                }
                else {
                    // this.questionText.fill = "red"
                    this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.errorStyle)
                    this.instructionText.setText("Ez nem a helyes eredmény, próbáld újra")
                }

            }


        }
        else {
            // if (this.actualQuestionTextIndex <= this.multiplierArrayShuffled.length - 1) {
            if (this.answer == (this.multiplier * this.multiplicand).toString()) {
                // if (this.answer == (this.multiplicand * this.multiplierArrayShuffled[this.actualQuestionTextIndex]).toString()) {
                // this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
                // this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.readyStyle)
                // if (this.actualQuestionTextIndex != this.multiplierArrayShuffled.length - 1) {
                //     this.actualQuestionTextIndex++
                //         this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.onWorkStyle)
                // }
                // else {
                this.questionText.fill = 'yellow'
                this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
                this.helpButton.destroy()
                this.clearButton.destroy()
                this.readyButton.destroy()
                this.add.button(700, 10, 'backtogame_button', function() {
                    //@todo this.multiplier separate to round counting 
                    this.game.state.start('ShootingState', true, false, 1, true, false, this.surveyType);
                }, this, 0, 0, 0, 1);

                //all questions answered well

                // }
                // this.instructionText.setText("Ügyes vagy, ez a helyes válasz!\n Kattints a \"JÁTÉK\" gombra")
                // this.helpButton.destroy()
                // this.clearButton.destroy()
                // this.readyButton.destroy()

                // this.add.button(700, 10, 'backtogame_button', function() {
                //     //@todo this.multiplier separate to round counting 
                //     this.game.state.start('ShootingState', true, false, 1, true, false, this.surveyType);
                // }, this, 0, 0, 0, 1);
            }
            else {
                this.questionText.fill = "red"
                    // this.questionTextArray[this.actualQuestionTextIndex].setStyle(this.errorStyle)
                    // this.instructionText.setText("Ez nem a helyes eredmény, próbáld újra")
            }

            // }

        }
        this.answer = ''
    },

    clearButtonClick: function() {
        this.answer = ""

        if (this.surveyType == 'mult2part1' || this.surveyType == 'mult2part2') {
            var text = this.multiplierArrayShuffled[this.actualQuestionTextIndex].toString() + " * " + this.multiplicand.toString() + " = "
            this.questionTextArray[this.actualQuestionTextIndex].setText(text)
            if (this.wrongBicylceCountText != null) {
                this.wrongBicylceCountText.destroy()

                this.magicianButton.visible = true
            }

            while (this.bicycleNoWheelGroup.length > 0) {
                this.bicycleNoWheelGroup.children.pop().destroy()
            }
            // this.bicycleGroup.children.forEach(function(item){
            //   item.destroy() 
            // })
            while (this.bicycleGroup.length > 0) {
                this.bicycleGroup.children.pop().destroy()
            }
            // this.bicycleWheelGroup.children.forEach(function(item){
            //   item.destroy() 
            // })
            while (this.bicycleWheelGroup.length > 0) {
                this.bicycleWheelGroup.children.pop().destroy()
            }
            // for(var i = 0; i < l; i++){
            //   this.bicycleWheelGroup.children[i].destroy() 
            //   console.log(i)
            // }
            // this.helpCountingTextGroup.children.forEach(function(item){
            //   item.destroy() 
            // })
            while (this.helpCountingTextGroup.children.length > 0) {
                this.helpCountingTextGroup.children.pop().destroy()
            }
        }
        else {
            this.questionText.setText(this.multiplier.toString() + " * " + this.multiplicand.toString() + " = " + this.answer)
            this.questionText.fill = "yellow"
            if (this.wrongBicylceCountText != null) {
                this.wrongBicylceCountText.destroy()

                this.magicianButton.visible = true
            }

        }
        this.bicycleCount = 0
        this.columnCounter = 0
        this.wheelCounter = 0

    }




}



PracticeGame.SurveyStateLearn2X.prototype.render = function() {
    // console.log('render')
    // this.game.debug.text('hoppa' + this.instructionText.text,20,20,'yellow')
    // this.game.debug.body(this.bicycleGroup.children[0],20,20,'yellow')
    // if (this.bicycleGroup.children.length > 1 && this.bicycleGroup.children[1].body != null) {

    //     this.game.debug.body(this.bicycleGroup.children[1])
    // }

    // var text = this.questionTextArray[this.actualQuestionTextIndex]

}

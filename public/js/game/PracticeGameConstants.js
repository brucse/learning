var PracticeGameConstants = {

    ACTUAL_MODES : {
            INTRODUCTION_MODE: 1,
            ENGRAVE_MODE: 2,
            CHECK_MODE: 3,
            MOVE_CAGE_UP_MODE: 4, //????
            SCORE_MODE: 5
        },


        GAME_STATES : {
            START: 1, // robber and policeman arrive in the game, behind left wall an cage. cage is down
            CAGE_OPEN_FOR_ROBBER: 2, // cage open for robber who can run over, policeman is left from cage
            //		ROBBER_OVER_CAGE_BUT_CANT_ESCAPE = 3, // robber over the cage, can't over the right wall, can't go back 
            //to the cage's left side, policeman is left from cage
            CAGE_CLOSED_FOR_POLICEMAN: 4, //policeman cannot run over the cage, he is on the left side, robbery is on the right side, cage is down
            CAGE_OPEN_FOR_POLICEMAN: 5, //cage open for policeman who can run over the cage , robber is in the right side of cage
            //@todo = implement as game status phraser object
            ARRESTING: 6, // police car comes and catch robber
            ROBBER_IN_PRISON: 7 // robber in the prison 

        }
}


 
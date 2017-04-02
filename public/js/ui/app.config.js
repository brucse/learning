'use strict';

angular.
module('learnG').
config(['$locationProvider', '$routeProvider',
	function config($locationProvider, $routeProvider) {
		$locationProvider.hashPrefix('!');

		$routeProvider.
		when('/', {
			templateUrl: 'survey_list.html'
		}, function() {
			console.log('default')
		}).
		when('/survey/:surveyId', {
				templateUrl: 'survey.html',
			}) //.
			// otherwise('/');
	}
]);


angular.
module('learnG').controller('surveyController', function($scope, $routeParams, $http) {
	$scope.surveyId = $routeParams.surveyId
	$http.get('data/' + $routeParams.surveyId + '.json').then(function(response) {
		console.log(response)
		$scope.surveyData = response.data;

		/* var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
			preload : preload,
			create : create,
			update : update,
			render: render
		});*/

		var game = new Phaser.Game(800, 600);

		// game.state.add('InitState', PracticeGame.InitState);
		game.state.add('ShootingState', PracticeGame.ShootingState);
		// game.state.add('ChaseState', PracticeGame.ChaseState);
		game.state.add('SurveyStateLearn2X', PracticeGame.SurveyStateLearn2X);
		game.state.add('GrandFinaleState', PracticeGame.GrandFinaleState);


		var survey = new Survey(game)
			//@todo temporary solution
		game.__proto__.survey = survey

		survey.questionarieFilledSignal.add(function() {

			var nextMode

			var avaiableStatuses = survey.getAvaiableStatuses()
			var actualModeIndex = _.indexOf(avaiableStatuses, statusObject.actualMode)

			nextMode = avaiableStatuses[actualModeIndex + 1]

			/*switch(statusObject.actualMode){
			case ACTUAL_MODES.INTRODUCTION_MODE:
				nextMode = ACTUAL_MODES.ENGRAVE_MODE
				break
			case ACTUAL_MODES.ENGRAVE_MODE:
				nextMode = ACTUAL_MODES.CHECK_MODE
				break
			case ACTUAL_MODES.CHECK_MODE:
				nextMode = ACTUAL_MODES.SCORE_MODE
				break
			default:

			}*/

			blocked = false;
			questionAnswered = true;
			moveCageUp();
			statusObject.stopPoliceman = false;
			statusObject.actualMode = nextMode
			statusObject.robberInCageAndRighWall = false
			robber.body.velocity.x = 150
		})

		/*game.load.json('survey_data', 'data/survey_data.js');
		var surveyData = game.cache.getJSON('survey_data');
		*/
		survey.loadJSONData($scope.surveyData)
		// PracticeGame.statusObject.actualMode = survey.getAvaiableStatuses()[0]
		
		
		// game.state.start('InitState');
		// game.state.start('SurveyState');
		// game.state.start('ShootingState',true,false,1);
		game.state.start('SurveyStateLearn2X',true,false,1);
		// game.state.start('GrandFinaleState');

	})

})

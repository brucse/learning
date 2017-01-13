'use strict';

angular.
  module('learnG').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
       when('/', {
          templateUrl:'survey_list.html' 
        },function(){
         console.log('default') 
        }).
        when('/survey/:surveyId', {
          templateUrl: 'survey.html',
        })//.
        // otherwise('/');
    }
  ]);
  
  
angular.
  module('learnG').controller('surveyController',function($scope,$routeParams,$http){
    $scope.surveyId = $routeParams.surveyId 
    $http.get('data/' + $routeParams.surveyId + '.json').then(function(response) {
      console.log(response)
          $scope.surveyData = response.data;
          })

  })

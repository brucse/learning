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
          controller: 'surveyController'
        })//.
        // otherwise('/');
    }
  ]);

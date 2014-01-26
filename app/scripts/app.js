'use strict';

var hailTheKing = angular.module('hail-the-king', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

hailTheKing.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/support', {
        templateUrl: 'views/support.html',
        controller: 'SupportCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });

hailTheKing.factory('wines', function($resource) {
  return $resource('/wines/:id', { id: '@id'}, {update: {method: 'PUT'}} )
})
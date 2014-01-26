'use strict';

angular.module('hail-the-king')
  .controller('LoginCtrl', function ($scope, wines) {
  	
  	$scope.wines = wines.query();

  });

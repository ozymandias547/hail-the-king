'use strict';

angular.module('hail-the-king').controller('UserPageCtrl', function ($scope, UserPage, $routeParams) {
	$scope.username = ""

	//TODO: Find if username exists and return the JSON data about the user.
	$scope.initialize = function() {
		$scope.username = $routeParams.username;
	}
})
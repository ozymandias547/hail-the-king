'use strict';

angular.module('hail-the-king')
  .controller('MainCtrl', function ($scope, $location, $rootScope) {
    
  	$scope.toUserPage = function() {
  		$location.path('/userpage/' + $rootScope.currentUser.username);
  	}

  });

'use strict';

angular.module('hail-the-king')
  .controller('LoginCtrl', function ($scope, Auth, $location, $rootScope) {
  	$scope.error = {};
  	$scope.user = {};

    $scope.toUserPage = function() {
      $location.path('/userpage/' + $rootScope.currentUser.username);
    }
    
  	$scope.login = function(form) {
  		Auth.login('password', {
  			'email': $scope.user.email,
  			'password': $scope.user.password
  		}, function(err) {
  			$scope.errors = {};

  			if (!err) {
          $location.path('/userpage/' + $rootScope.currentUser.username);
  			} else {
  				angular.forEach(err.errors, function(error, field) {
  					form[field].$setValidity('mongoose', false);
  					$scope.errors[field] = error.type;
  				});
  				$scope.error.other = err.message
  			}
  		})
  	}

  });

'use strict';

angular.module('hail-the-king')
  .controller('SignupCtrl', function ($scope, Auth, $location, $rootScope) {
  	$scope.login = function(form) {
      Auth.login('password', {
        'email': $scope.user.loginEmail,
        'password': $scope.user.loginPassword
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
    $scope.register = function(form) {
  		Auth.createUser({
  			email: $scope.user.registerEmail,
  			username: $scope.user.registerUsername,
  			password: $scope.user.registerPassword
  		}, 
  		function(err) {
  			$scope.errors = {};

  			if (!err) {
  				$location.path('/')
  			} else  {
  				angular.forEach(err.errors, function(error, field) {
  					form[field].$setValidity('mongoose', false);
  					$scope.errors[field] = error.type;
  				})
  			}
  		})
  	}
  });

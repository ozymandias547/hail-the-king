'use strict';

var hailTheKing = angular.module('hail-the-king', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
]);

hailTheKing.config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/support', {
        templateUrl: 'views/support.html',
        controller: 'SupportCtrl'
      })
      .when('/userpage/:username', {
        templateUrl: 'views/userPages/userHome.html',
        controller: 'UserPageCtrl'
      })
      .otherwise({
        redirectTo: '/main'
      });
  });

hailTheKing.run(function($rootScope, $location, Auth) {

    $rootScope.logout = function() {
      Auth.logout(function(err) {
        if (!err) {
          $location.path('/')
        }
      })
    }

  //Watch the currentUser variable
  $rootScope.$watch('currentUser', function(currentUser) {

    //If no currentUser & on a page that requires authentication, then try to update the currentUser
    //If the session doesn't contain a user, a 401 will be sent, and the interceptor will redirect to login
    if (!currentUser && ([]).indexOf($location.path()) == -1) {
      Auth.currentUser();
    }
  })
  
  //this catches any 401 error (event:auth-loginRequired is an event called by the http-interceptor)
  $rootScope.$on('event:auth-loginRequired', function() {
    $location.path('/login');
    return false;
  })
})
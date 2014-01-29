'use strict';

angular.module('hail-the-king')
  .factory('UserPage', function ($resource) {
    return $resource('api/userpage/:userId', {
      blogId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });

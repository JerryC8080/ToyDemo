
angular.module('checkmarkFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  }
})

angular.module('userService', ['ngResource']).factory('Phone', function($resource) {
  return $resource('/data/:userid.json', {userid: 'users'})
});

angular
.module('MyApp', [
  'ngRoute',
  'ngLodash',
  'checkmarkFilters',
  'userService'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/user-list', {
      templateUrl: 'views/user-list.html',
      controller: 'UserListCtrl'
    })
    .when('/user-detail/:userid', {
      templateUrl: 'views/user-detail.html',
      controller: 'UserDetailCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
})
.controller('UserListCtrl', [
  '$scope', 
  '$http',
  'Phone',
  function($scope, $http, Phone) {
    $scope.users = Phone.query();
    $scope.orderProp = 'name';        
}])
.controller('UserDetailCtrl', [
  '$scope', 
  '$routeParams', 
  '$http', 
  'lodash',
  'Phone',
  function($scope, $routeParams, $http, lodash, Phone) {
    $scope.user = Phone.get({userid: $routeParams.userid});

    $scope.hello = function (name) {
      $scope.helloword = 'hello ' + name 
    }
}])

angular
.module('MyApp', [
  'ngRoute',
  'ngLodash'
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
.controller('UserListCtrl', ['$scope', '$http', function($scope, $http) {
  $http
    .get('/users.json')
    .success(function(data) {
      $scope.users = data;
    });
  $scope.orderProp = 'name';        
}])
.controller('UserDetailCtrl', [
  '$scope', 
  '$routeParams', 
  '$http', 
  'lodash',
  function($scope, $routeParams, $http, lodash) {
    $http
      .get('/users.json')
      .success(function(data) {
        $scope.user = lodash.find(data, ['id', $routeParams.userid]);
      });
}])
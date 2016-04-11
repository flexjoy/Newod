/**
 * Created by SCherepanov on 08.04.2016.
 */

'use strict';

var newodApp = angular.module('newodApp', ['ngRoute']);

newodApp.config(function ($routeProvider) {
	$routeProvider.
	when('/store-select', {
		templateUrl: 'store-select',
		controller: 'StoreSelectController',
		resolve: {
			divisions: function($http) {
				return $http.get('/divisions');
			}
		}
	}).
	when('/home', {
		templateUrl: 'home',
		controller: 'HomeController'
	}).
	otherwise({redirectTo: 'home'});
});

newodApp.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

newodApp.controller('StoreSelectController', function($scope, divisions) {
	$scope.divisions = divisions.data;
});

newodApp.controller('HomeController', function($scope) {});

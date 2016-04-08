/**
 * Created by SCherepanov on 08.04.2016.
 */

var newodApp = angular.module('newodApp', ['ngRoute']);


newodApp.config(function ($routeProvider) {
	$routeProvider.
	when('/store-select', {
		templateUrl: 'store-select',
		controller: 'StoreSelectController'
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

newodApp.controller('StoreSelectController', function($scope) {});

newodApp.controller('HomeController', function($scope) {});

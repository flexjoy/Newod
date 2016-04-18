'use strict';

var app = angular.module('App', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/store-select', {
			templateUrl: 'store-select',
			controller: 'StoreSelectController'
		})
		.when('/home', {
			templateUrl: 'home',
			controller: 'HomeController'
		})
		.otherwise({redirectTo: 'home'});
});

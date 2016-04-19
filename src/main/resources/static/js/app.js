'use strict';

var app = angular.module('App', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/store-select', {
			templateUrl: 'partials/store-select.html',
			controller: 'StoreSelectController'
		})
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		})
		.otherwise({redirectTo: 'home'});
});

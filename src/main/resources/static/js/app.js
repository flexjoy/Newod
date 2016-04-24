'use strict';

var app = angular.module('App', ['ngRoute', 'ui.bootstrap']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		})
		.when('/divisions', {
			templateUrl: 'partials/divisions.html',
			controller: 'DivisionController',
			controllerAs: 'vm'
		})
		.otherwise({redirectTo: 'home'});
});

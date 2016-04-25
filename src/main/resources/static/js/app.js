'use strict';

var app = angular.module('App', ['ngResource', 'ui.router', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home', {
			url: "/home",
			templateUrl: "partials/home.html"
		})

	$urlRouterProvider.otherwise('/home');
});

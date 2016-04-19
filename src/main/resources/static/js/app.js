'use strict';

var app = angular.module('App', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/store-select', {
			templateUrl: 'partials/store-select.html',
			controller: 'StoreSelectController',
			resolve: {
				divisions: function ($http) { return $http.get('/division'); },
				cities: function ($http) { return $http.get('/city'); }
			}
		})
		.when('/store/:id', {
			templateUrl: 'partials/store.html',
			controller: 'StoreController',
			resolve: {
				store: function ($http, $route) {
					return $http.get('/store/' + $route.current.params.id);
				}
			}
		})
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeController'
		})
		.otherwise({redirectTo: 'home'});
});

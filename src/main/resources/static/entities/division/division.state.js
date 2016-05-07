'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('divisions', {
			url: "/divisions?page&size&sort",
			templateUrl: "entities/division/divisions.html",
			controller: 'DivisionController',
			controllerAs: 'vm'
		})
});

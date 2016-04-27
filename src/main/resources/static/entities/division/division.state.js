'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('divisions', {
			url: "/divisions?page&size&sort",
			templateUrl: "entities/division/divisions.html",
			controller: 'DivisionController',
			controllerAs: 'vm',
			params: {
				page: {
				 	value: '1',
					squash: true
				},
				size: {
					value: '10',
					squash: true
				},
				sort: {
					value: 'name,asc',
					squash: true
				}
			},
			reloadOnSearch: false
		})
});

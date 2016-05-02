'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('cities', {
			url: "/cities?page&size&sort&search",
			templateUrl: "entities/city/cities.html",
			controller: 'CityController',
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
				},
				search: {
					value: '',
					squash: true
				}
			},
			reloadOnSearch: false
		})
});

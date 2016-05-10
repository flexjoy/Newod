'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('cities', {
			url: "/cities?page&size&sort&name&enabled&division",
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
				}
			},
			resolve : {

				// convert $state.params from path to ngTable initial params
				initParams: function (ngTableService, $stateParams) {
					return ngTableService.StateParamsToParameters($stateParams);
				}
			}
		})
});

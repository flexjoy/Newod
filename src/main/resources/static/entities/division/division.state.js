'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('divisions', {
			url: "/divisions?page&size&sort&name&enabled",
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
			resolve : {

				// convert $state.params from path to ngTable initial params
				initParams: function (ngTableService, $stateParams) {
					return ngTableService.StateParamsToParameters($stateParams);
				}
			}
		})
});

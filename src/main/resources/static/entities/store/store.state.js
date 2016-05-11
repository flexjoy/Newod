'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('stores', {
			url: "/stores?page&size&sort&name&enabled&city",
			templateUrl: "entities/store/stores.html",
			controller: 'StoreController',
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

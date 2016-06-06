'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('store-detail', {
			url: "/stores/:id",
			templateUrl: "entities/store-detail/store.html",
			onEnter: function ($stateParams, Data) {
				Data.getStore($stateParams.id);
				Data.refreshCities();
			},
			controller: 'StoreDetailController',
			controllerAs: 'vm'
		})
});


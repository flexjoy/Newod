'use strict';

app.config(function ($stateProvider) {

	$stateProvider
		.state('store-detail', {
			url: "/stores/:id",
			templateUrl: "entities/store-detail/store.html",
			resolve: {
				store: function (Store, $stateParams) {
					return  Store.get({ id: $stateParams.id }).$promise;
				},
				cities: function (City) {
					return City.getAll().$promise;
				}
			},
			controller: 'StoreDetailController',
			controllerAs: 'vm'
		})
});


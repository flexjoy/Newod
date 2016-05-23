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
			controller: function ($scope, store, cities, Store) {
				var vm = this;
				$scope.store = angular.copy(store);
				$scope.cities = cities;
				vm.save = save;
				vm.reset = reset;

				function save(store) {
					Store.update(store);
				}

				function reset(form) {
					angular.extend($scope.store, store);
					form.$setPristine();
				}
			},
			controllerAs: 'vm'
		})
});


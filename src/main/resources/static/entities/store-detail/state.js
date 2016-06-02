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
			controller: function ($scope, store, cities, Store, ToastService, $filter) {
				var vm = this;
				var $translate = $filter('translate');
				$scope.store = angular.copy(store);
				$scope.cities = cities;
				vm.save = save;
				vm.reset = reset;

				function save(store, form) {
					Store.update(store, function () {
						ToastService.Success($translate('TEXT.updated'));
						form.$setPristine();
						$scope.$parent.city = store.city;
						$scope.sb.changeCity(store.city);
					}, onError);
				}

				function reset(form) {
					angular.extend($scope.store, store);
					form.$setPristine();
				}

				function onError(error) {
					ToastService.Error(error.data.error);
				}
			},
			controllerAs: 'vm'
		})
});


'use strict';

app.controller('StoreDetailController', function ($scope, store, cities, Store, ToastService, $filter) {

	var $translate = $filter('translate');
	$scope.store = angular.copy(store);
	$scope.cities = cities;
	this.save = save;
	this.reset = reset;

	// save updated store
	function save(store, form) {
		Store.update(store, function () {
			ToastService.Success($translate('TEXT.updated'));
			form.$setPristine();
			$scope.$parent.city = store.city;
			$scope.sb.changeCity(store.city);
		}, onError);
	}

	// reset form
	function reset(form) {
		angular.extend($scope.store, store);
		form.$setPristine();
	}

	function onError(error) {
		ToastService.Error(error.data.error);
	}
});

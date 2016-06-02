'use strict';

app.controller('NavBarController', function($scope, $location, $translate, $http) {

	// fix reset active link in navbar
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	// set language for backend
	$scope.setLanguage = function (locale) {
		$translate.use(locale);
		$http.get('/locale/' + locale);
	}
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.controller('SidebarController', function($scope, $timeout, City, Store, ToastService) {
	
	this.changeCity = changeCity;
	this.refreshCities = refreshCities;
	this.refreshStores = refreshStores;
	this.refreshCities();

	// user change city in select dropdown
	function changeCity (city) {
		if (city == null) {
			$scope.stores = [];
		} else {
			Store.getAll( {city : city.id},
				function (data) { $scope.stores = data; },
				onError
			);
		}
	}
	
	function refreshCities () {
		$scope.citiesBg = "update";
		$timeout(removeBg, 1);
		City.getAll(
			function (data) { $scope.cities = data; },
			onError
		);
	}

	function refreshStores (city) {
		$scope.storesBg = "update";
		$timeout(removeBg, 1);
		changeCity(city);
	}

	function onError(error) {
		ToastService.Error(error.data.error);
	}
	
	function removeBg() {
		$scope.citiesBg = null;
		$scope.storesBg = null;
	}
});

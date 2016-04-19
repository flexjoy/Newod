'use strict';

app.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

app.controller('HomeController', function($scope) {});

app.controller('StoreSelectController', function($scope, $http, divisions, cities) {
	
	$scope.divisions = divisions.data;
	$scope.cities = cities.data;

	$scope.selectCity = function (city) {
		$http.get('/city/' + city.id + '/store')
			.success(function (data) {
				$scope.stores = data;
				$scope.selectedCity = city;
			});
	}

	$scope.sortChanged = function () {
		// TODO save sort to cookie or database
	}

	$scope.firstLetter = function (name) {
		return name && name[0].toUpperCase();
	}

	$scope.sort = "0"; // sort cities by divisions
});

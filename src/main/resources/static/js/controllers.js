'use strict';

app.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

app.controller('HomeController', function($scope) {});

app.controller('StoreSelectController', function($scope, $http) {

	$scope.selectCity = function (city) {
		$http.get('/city/' + city.id + '/store')
			.success(function (data) {
				$scope.stores = data;
				$scope.selectedCity = city;
			});
	}

	$scope.sortChanged = function () {
		if ($scope.sort == 1) {
			$http.get('/city')
				.success(function (data) {
					$scope.cities = data;
				});
		} else {
			$http.get('/division')
				.success(function (data) {
					$scope.divisions = data;
				});
		}
	}

	$scope.firstLetter = function (name) {
		return name && name[0].toUpperCase();
	}

	$scope.sort = "0"; // sort cities by divisions
	$scope.sortChanged();
});

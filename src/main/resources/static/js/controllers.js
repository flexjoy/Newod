'use strict';

app.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

app.controller('HomeController', function($scope) {});

app.controller('StoreSelectController', function($scope, $http, divisions) {
	$scope.divisions = divisions.data;

	$scope.selectCity = function (city) {
		$http.get('/city/' + city.id + '/store')
			.success(function (data) {
				$scope.stores = data;
				$scope.selectedCity = city;
			});
	}
});

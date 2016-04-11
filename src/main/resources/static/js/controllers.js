'use strict';

app.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

app.controller('HomeController', function($scope) {});

app.controller('StoreSelectController', function($scope, divisions) {
	$scope.divisions = divisions.data;
});

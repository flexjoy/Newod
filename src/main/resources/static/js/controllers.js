'use strict';

app.controller('NavBarController', function($scope, $location) {
	
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

/**
 * Created by Sergey on 11.04.2016.
 */

'use strict';

newodApp.controller('NavBarController', function($scope, $location) {
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};
});

newodApp.controller('HomeController', function($scope) {});

newodApp.controller('StoreSelectController', function($scope, divisions) {
	$scope.divisions = divisions.data;
});

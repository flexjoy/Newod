'use strict';

app.controller('NavBarController', function($scope, $location, $translate) {
	
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setLanguage = function (locale) {
		$translate.use(locale);
	}
});

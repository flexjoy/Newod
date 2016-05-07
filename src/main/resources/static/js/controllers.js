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

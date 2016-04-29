'use strict';

app.controller('NavBarController', function($scope, $location, $translate, $http) {
	
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setLanguage = function (locale) {
		$translate.use(locale);
		$http.get('/locale/' + locale);
	}
});

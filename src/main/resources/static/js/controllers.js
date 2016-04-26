'use strict';

app.controller('NavBarController', function($scope, $location, $translate) {
	
	$scope.isActive = function (viewLocation) {
		return viewLocation === $location.path();
	};

	$scope.setLanguage = function (locale) {
		$translate.use(locale);
	}
});

app.controller('AlertController', function($scope, AlertService) {

	$scope.alerts = AlertService.getAlerts();

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
});
